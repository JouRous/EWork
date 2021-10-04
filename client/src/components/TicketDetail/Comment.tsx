import { IComment } from 'models/IComment';
import { FC } from 'react';
import Avatar from 'react-avatar';
import moment from 'moment';

interface IProps {
  comment: IComment;
  user: any;
  deleteComment: (commentId: string) => void;
}

export const Comment: FC<IProps> = ({ comment, user, deleteComment }) => {
  return (
    <div className="flex w-full my-3">
      <div
        style={{ height: 35, width: 35 }}
        className="overflow-auto rounded-full"
      >
        <Avatar name={user.username} size="35" textSizeRatio={2.75} />
      </div>
      <div className="flex-1 ml-3">
        <div className="font-semibold mb-2">
          <span>{user.username}</span>
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <div className="bg-white px-3 py-2 shadow-md rounded">
          {comment.content}
        </div>
        <div>
          <button
            style={{ color: '#5e6c84', fontSize: 12 }}
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
          <button className="mx-2" style={{ color: '#5e6c84', fontSize: 12 }}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
