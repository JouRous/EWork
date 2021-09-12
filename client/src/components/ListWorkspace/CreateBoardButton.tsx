import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #091e420a;
  border: none;
  box-shadow: none;
  color: #172b4d;
  font-weight: 400;
  text-align: center;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  vertical-align: middle;

  &:hover {
    background-color: #091e4214;
    border: none;
    box-shadow: none;
  }
`;

interface IProps {
  projectId: string;
  openForm: () => void;
}

export const CreateBoardButton: FC<IProps> = ({ openForm }) => {
  function create() {
    openForm();
  }

  return (
    <div>
      <Wrapper className="grid place-items-center rounded w-full p-2">
        <button
          onClick={create}
          style={{ height: 80 }}
          className="block w-full"
        >
          <div>Create new board</div>
        </button>
      </Wrapper>
    </div>
  );
};
