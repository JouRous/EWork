import { IComment } from 'models/IComment';
import { FC, useState } from 'react';
import Avatar from 'react-avatar';
import moment from 'moment';

interface IProps {
  comment: IComment;
  user: any;
  deleteComment: (commentId: string) => void;
}

export const Comment: FC<IProps> = ({ comment, user, deleteComment }) => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <div className="flex w-full my-3">
      <div
        style={{ height: 35, width: 35 }}
        className="overflow-auto rounded-full"
      >
        <Avatar name={user.username} size="35" textSizeRatio={2.75} />
      </div>
      <div className="flex-1 ml-3">
        <div className="flex items-center mb-2">
          <span className="font-semibold mr-2">{user.username}</span>
          <span style={{ color: '#5e6c84', fontSize: 12 }}>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <div>
          <input
            className="bg-white px-3 py-2 shadow-md rounded w-full"
            value={comment.content}
            disabled={!edit}
          />
        </div>
        <div>
          <button
            style={{ color: '#5e6c84', fontSize: 12 }}
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
          <button
            className="mx-2"
            style={{ color: '#5e6c84', fontSize: 12 }}
            onClick={() => setEdit(true)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
