import { FC } from 'react';
import { IUser } from '../../models/user';
import { ReactComponent as HomeIcon } from '../../assets/icons/home-icon.svg';
import { ReactComponent as BoardIcon } from '../../assets/icons/board-icon.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg';
import DefaultAvatar from '../../assets/icons/avatar-default.svg';
import Avatar from 'react-avatar';

interface IProps {
  user: IUser;
}

export const Header: FC<IProps> = ({ user }) => {
  return (
    <div
      className="fixed w-full top-0"
      style={{ backgroundColor: 'rgba(0,0,0,0.1)', height: 45, zIndex: 100 }}
      // style={{ backgroundColor: '#026AA7', height: 45, zIndex: 100 }}
    >
      <div className="flex justify-between items-center px-2 py-1 text-white">
        <div style={{ height: 35 }} className="flex">
          <button
            style={{ width: 35 }}
            className="inline-block bg-light-blue rounded text-center"
          >
            <HomeIcon className="inline" />
          </button>
          <button className="flex items-center bg-light-blue mx-2 p-2 rounded">
            <span className="block mr-2">
              <BoardIcon className="inline" />
            </span>
            <span className="block font-bold">Board</span>
          </button>
          <div className="bg-light-blue flex items-center rounded relative">
            <input
              className=" input-search
                h-full px-3 bg-transparent text-white placeholder-white
                focus:shadow-none focus:outline-none
              "
              type="text"
              placeholder="Jump to..."
            />
            <span className="absolute h-full flex items-center pr-2 top-0 right-0">
              <SearchIcon />
            </span>
          </div>
        </div>
        <div className="flex">
          <button className="inline-block bg-light-blue rounded px-2 mx-3">
            Create
          </button>
          <button
            style={{ width: 35, height: 35 }}
            className="inline-block rounded-full overflow-hidden"
          >
            {user ? (
              <Avatar name={user.username} size="35" />
            ) : (
              <img
                className="block h-full w-full"
                src={DefaultAvatar}
                alt="user-avatar"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
