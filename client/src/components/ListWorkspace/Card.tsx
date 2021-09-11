import { IBoard } from 'models/IBoard';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BoardCardWrapper = styled(Link)`
  background-image: url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x270/697ce3ddf41617efb782f533422a1bf5/photo-1630704236714-b9ae325f1aad.jpg');
`;

interface IProps {
  board: IBoard;
}

export const Card: FC<IProps> = ({ board }) => {
  return (
    <div className="mb-3">
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
