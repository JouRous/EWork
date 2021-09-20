import { IUser } from 'models/user';
import { FC } from 'react';
import Avatar from 'react-avatar';
import { openInviteModal } from 'store/features/board/boardSlice';
import { useAppDispatch } from 'store/hooks';
import styled from 'styled-components';

const Container = styled.div`
  height: 45px;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

const Button = styled.div`
  border-radius: 3px;
  color: #fff;
  cursor: default;
  float: left;
  font-size: 14px;
  height: 32px;
  line-height: 32px;
  margin: 0 4px 4px 0;
  padding: 0 8px;
  max-width: 400px;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  text-overflow: ellipsis;
  background-color: #fff6;
  cursor: pointer;
`;

const AvatarWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
`;

interface IProps {
  members: IUser[];
  boardName: string;
}

export const BoardHeader: FC<IProps> = ({ boardName, members }) => {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <div className="flex">
        <div
          style={{ fontSize: 18, lineHeight: '35px' }}
          className="font-bold text-white h-full mr-3"
        >
          {boardName}
        </div>
        <div className="flex items-center">
          {members &&
            members.map((member) =>
              member.avatar ? (
                <AvatarWrapper key={member.id}>
                  <img src={member.avatar} alt="user-avatar" />
                </AvatarWrapper>
              ) : (
                <AvatarWrapper key={member.id}>
                  <Avatar size="30" name={member.username} />
                </AvatarWrapper>
              )
            )}
          <div className="ml-2">
            <Button onClick={() => dispatch(openInviteModal())}>Invite</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};
