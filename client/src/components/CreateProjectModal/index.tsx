import { FC } from 'react';
import { useForm } from 'react-hook-form';
import http from 'services/http-service';
import { closeModal, dismissModal } from 'store/features/project/projectSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
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

interface IProps {}

export const CreateProjectModal: FC<IProps> = () => {
  const isOpenModal = useAppSelector((state) => state.project.isModalOpen);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useAppDispatch();

  function closeCreateModal(data: any) {
    const body = { ...data };
    http.post('/api/v1/project', body).subscribe((response) => {
      console.log(response);
      reset({ name: '' });
      dispatch(closeModal());
    });
  }

  return isOpenModal ? (
    <div
      style={{ zIndex: 999 }}
      className="fixed top-0 left-0 h-screen w-screen"
    >
      <CreateForm>
        <h1>Create Board</h1>
        <input type="text" {...register('name')} />
        <button
          onClick={handleSubmit((data) => closeCreateModal(data))}
          className="bg-red-600"
        >
          Submit
        </button>
      </CreateForm>
      <Overlay onClick={() => dispatch(dismissModal())} />
    </div>
  ) : null;
};
