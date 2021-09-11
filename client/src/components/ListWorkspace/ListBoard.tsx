import { IBoard } from 'models/IBoard';
import { FC } from 'react';
import { Card } from './Card';
import { CreateBoardButton } from './CreateBoardButton';

interface IProps {
  boards: IBoard[];
}

export const ListBoard: FC<IProps> = ({ boards }) => {
  return (
    <div className="mt-2">
      <div className="grid grid-cols-4 gap-x-4">
        {boards.map((board) => (
          <Card board={board} />
        ))}
        <CreateBoardButton />
      </div>
    </div>
  );
};
