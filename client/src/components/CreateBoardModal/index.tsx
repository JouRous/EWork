import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
`;

const CreateForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 200;
`;

interface IProps {
  submit: (data: any) => void;
  closeModal: () => void;
}

export const CreateBoardModal: FC<IProps> = ({ submit, closeModal }) => {
  const { register, handleSubmit } = useForm();

  return (
    <div
      style={{ zIndex: 999 }}
      className="fixed top-0 left-0 w-screen h-screen"
    >
      <CreateForm>
        <input type="text" {...register('name')} placeholder="Board Title" />
        <button onClick={handleSubmit((data) => submit(data))}>Submit</button>
      </CreateForm>
      <Overlay onClick={() => closeModal()} />
    </div>
  );
};
