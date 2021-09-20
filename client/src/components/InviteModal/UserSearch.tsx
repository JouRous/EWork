import { IUser } from 'models/user';
import { FC } from 'react';
import Avatar from 'react-avatar';
import styled from 'styled-components';

interface IProps {
  user: IUser;
}

const Container = styled.div`
  border-radius: 3px;
  margin-top: 6px;
  /* cursor: pointer; */
  &:hover {
    background-color: #091e4253;
  }
`;

export const UserSearch: FC<IProps> = ({ user }) => {
  return (
    <Container
      style={{ height: 40 }}
      className="w-full flex items-center px-2 py-2"
    >
      <div
        style={{ width: 35, height: 35 }}
        className="rounded-full overflow-hidden mr-3"
      >
        {user.avatar ? (
          <img src={user.avatar} alt="User avatar" />
        ) : (
          <Avatar name={user.username} size="35" />
        )}
      </div>
      <div>
        <div>{user.username}</div>
      </div>
    </Container>
  );
};
