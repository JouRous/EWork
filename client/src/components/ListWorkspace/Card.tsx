import { IBoard } from 'models/IBoard';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BoardCardWrapper = styled(Link)`
  background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLOS1206m_ryaCwc6NpJGRjgNgN7jVtB3bvR9uYUvoc0MCCTdsTgKPzxKd5BDKOvrLhfA&usqp=CAU');
`;

interface IProps {
  board: IBoard;
}

export const Card: FC<IProps> = ({ board }) => {
  return (
    <div>
      <BoardCardWrapper to="" className="block p-2 rounded">
        <div
          style={{ height: 80 }}
          className="flex flex-col justify-between relative"
        >
          <div className="font-bold text-white">{board.name}</div>
          <div></div>
        </div>
      </BoardCardWrapper>
    </div>
  );
};
