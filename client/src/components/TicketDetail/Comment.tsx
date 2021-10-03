import { IComment } from 'models/IComment';
import { FC } from 'react';
import Avatar from 'react-avatar';

interface IProps {
  comment: IComment;
  user: any;
}

export const Comment: FC<IProps> = ({ comment, user }) => {
  return (
    <div className="flex w-full my-3">
      <div
        style={{ height: 35, width: 35 }}
        className="overflow-auto rounded-full"
      >
        <Avatar name={user.username} size="35" textSizeRatio={2.75} />
      </div>
      <div className="flex-1 ml-3">
        <div className="font-semibold">{user.username}</div>
        <div className="bg-white px-3 py-2 shadow-md rounded">
          {comment.content}
        </div>
        <div>
          <button>Delete</button>
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
};
