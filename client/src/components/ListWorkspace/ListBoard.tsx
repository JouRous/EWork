import { Card } from './Card';
import { CreateBoardButton } from './CreateBoardButton';

export const ListBoard = () => {
  return (
    <div className="mt-2">
      <div className="grid grid-cols-4 gap-x-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <CreateBoardButton />
      </div>
    </div>
  );
};
