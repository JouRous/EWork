import { IUser } from 'models/user';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { debounceTime, Subject } from 'rxjs';
import http from 'services/http-service';
import {
  closeInviteModal,
  dismissInviteModal,
} from 'store/features/board/boardSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import styled from 'styled-components';
import { UserSearch } from './UserSearch';

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const ModalHeader = styled.div`
  border-bottom: 1px solid #091e4221;
  box-sizing: border-box;
  color: #5e6c84;
  display: block;
  line-height: 40px;
  overflow: hidden;
  padding: 0 32px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 40px;
  text-align: center;
  z-index: 1;
`;

const Input = styled.input`
  display: block;
  background-color: #fafbfc;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  box-sizing: border-box;
  margin: auto;
  width: 100%;
  height: 32px;
  padding: 8px 12px;
  outline: unset;

  &:focus {
    box-shadow: inset 0 0 0 2px #0079bf;
  }
`;

const Button = styled.button`
  display: block;
  height: 40px;
  margin: 12px auto 0;
  width: 100%;
  font-size: 16px;
  background-color: #0079bf;
  border: none;
  box-shadow: none;
  color: #fff;
`;

interface IProps {
  boardId: string;
}

export const InviteModal: FC<IProps> = ({ boardId }) => {
  const [usersFound, setUsersFound] = useState<IUser[]>([]);
  const [invitedUser, setInvitedUser] = useState<IUser[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const isOpen = useAppSelector((state) => state.board.isOpenModal);
  const dispatch = useAppDispatch();
  const onSearch$ = useMemo(() => new Subject<string>(), []);

  useEffect(() => {
    onSearch$.pipe(debounceTime(500)).subscribe((searchValue) => {
      http
        .get<IUser[]>(`/api/v1/search/user?email=${searchValue}`)
        .subscribe((data) => {
          setIsSearch(true);
          setUsersFound(data);
        });
    });

    return () => onSearch$.unsubscribe();
  }, [onSearch$]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch$.next(event.target.value);
  };

  const addInvitedUser = (user: IUser) => {
    if (invitedUser.filter((x) => x.email === user.email).length > 0) {
      return;
    }

    const newInvitedUsers = [...invitedUser, user];
    setInvitedUser(newInvitedUsers);
    setUsersFound([]);
    setIsSearch(false);
  };

  const handleInvite = () => {
    const userIds = invitedUser.map((user) => user.id);

    http.post(`/api/v1/board/${boardId}/invite`, { userIds }).subscribe((_) => {
      dispatch(closeInviteModal());
    });
  };

  return isOpen ? (
    <div
      style={{ zIndex: 999 }}
      className="w-screen h-screen fixed top-0 left-0 grid place-items-center"
    >
      <div
        className="bg-white px-3 pt-1 pb-3 relative"
        style={{ zIndex: 100, width: 304 }}
      >
        <ModalHeader>Invite to board</ModalHeader>
        <div className="mt-3 relative" style={{ maxWidth: 512 }}>
          <Input
            onChange={(e) => handleOnChange(e)}
            onBlur={() => setIsSearch(false)}
            type="email"
            placeholder="Email address"
          />
          {isSearch && (
            <div
              style={{
                top: 50,
                minHeight: 40,
                maxHeight: 280,
                boxShadow: '0 8px 16px -4px #091e4240, 0 0 0 2px #091e4214',
              }}
              className="bg-white absolute left-0 overflow-y-auto w-full py-2 px-3"
            >
              {usersFound.length > 0 ? (
                usersFound.map((user) => (
                  <div key={user.id} onMouseDown={() => addInvitedUser(user)}>
                    <UserSearch user={user} />
                  </div>
                ))
              ) : (
                <div>Not found</div>
              )}
            </div>
          )}
        </div>
        <div
          style={{ minHeight: 50, maxHeight: 280 }}
          className="overflow-y-auto"
        >
          {invitedUser.length > 0
            ? invitedUser.map((user) => <div key={user.id}>{user.email}</div>)
            : null}
        </div>

        <Button className="rounded" onClick={handleInvite}>
          Send invitation
        </Button>
        <button
          style={{ width: 30, height: 30, zIndex: 110 }}
          className="absolute top-1 right-3 cursor-pointer"
          onClick={() => {
            dispatch(dismissInviteModal());
            setInvitedUser([]);
          }}
        >
          X
        </button>
      </div>
      <Overlay />
    </div>
  ) : null;
};
