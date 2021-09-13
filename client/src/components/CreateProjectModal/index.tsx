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
  background-color: #fff !important;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 200;
`;

const LeftArea = styled.div``;

const RightArea = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding-top: 112px;
`;

const InputText = styled.input`
  width: 85%;
  background-color: #fafbfc;
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  box-sizing: border-box;
  display: block;
  line-height: 20px;
  outline: none;
  padding: 8px 12px;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
`;

const TextArea = styled.textarea`
  width: 85%;
  background-color: #fafbfc;
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px #dfe1e6;
  box-sizing: border-box;
  display: block;
  line-height: 20px;
  outline: none;
  padding: 8px 12px;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
`;

const SubmitButton = styled.button`
  height: 40px;
  width: 85%;
  background-color: #0079bf;
  box-shadow: none;
  border: none;
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  padding: 6px 12px;
  text-decoration: none;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
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
      <CreateForm className="flex">
        <div className="bg-white flex flex-1 flex-col overflow-auto text-left px-5 py-4">
          <LeftArea>
            <span
              style={{ color: '#091E42', fontSize: 24 }}
              className="block font-semibold mb-2"
            >
              Let's build a Workspace
            </span>
            <span
              style={{ fontSize: 18, color: '#6B778C' }}
              className="block mb-4"
            >
              Boost your productivity by making it easier for everyone to access
              boards in one location.
            </span>
            <div>
              <label
                className="block font-bold mb-2"
                style={{ color: '#091E42' }}
              >
                Workspace name
              </label>
              <InputText type="text" {...register('name')} />
            </div>
            <div>
              <label
                className="block font-bold mb-2"
                style={{ color: '#091E42' }}
              >
                Workspace descriptions (Optional)
              </label>
              <TextArea rows={6} />
            </div>
            <SubmitButton
              onClick={handleSubmit((data) => closeCreateModal(data))}
              className="mt-4"
            >
              Continue
            </SubmitButton>
          </LeftArea>
        </div>
        <div>
          <RightArea
            style={{
              backgroundImage: `url(${process.env.REACT_APP_API_URL}/images/create-project-bg.svg)`,
            }}
          >
            <div>
              <img
                src={`${process.env.REACT_APP_API_URL}/images/empty-board.svg`}
                alt="empty board"
              />
            </div>
          </RightArea>
        </div>
      </CreateForm>
      <Overlay onClick={() => dispatch(dismissModal())} />
    </div>
  ) : null;
};
