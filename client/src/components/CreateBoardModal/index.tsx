import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { ReactComponent as CloseIcon } from 'assets/icons/close-icon.svg';
import { IProject } from 'models/IProject';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
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

const InputText = styled.input`
  border: none !important;
  background: transparent !important;
  box-shadow: none;
  box-sizing: border-box;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 4px;
  padding: 2px 8px;
  position: relative;
  width: 85%;

  &:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    box-shadow: none;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.3) !important;
    box-shadow: none;
    outline: none;
  }
`;

const ProjectName = styled.div`
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
  padding-left: 8px;
  background-color: rgba(9, 30, 66, 0.04);
  box-shadow: none;
  border: none;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
`;

const SubmitButton = styled.button`
  width: 105px;
  background-color: #055a8c;
  box-shadow: none;
  border: none;
  color: #ffffff;
  outline: 0;
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
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;
`;

interface IProps {
  submit: (data: any) => void;
  closeModal: () => void;
  project?: IProject;
}

export const CreateBoardModal: FC<IProps> = ({
  submit,
  closeModal,
  project,
}) => {
  const listColors = [
    {
      id: 1,
      color: 'rgb(0,121,191)',
    },
    {
      id: 2,
      color: '#D29034',
    },
    {
      id: 3,
      color: '#519839',
    },
    {
      id: 4,
      color: '#B04632',
    },
  ];

  const { register, handleSubmit } = useForm();
  const [background, setBackground] = useState<string>(listColors[0].color);

  const listImage = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1626033190220-9b6aa500d49e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjMxNDUzODQ3&ixlib=rb-1.2.1&q=80&w=400',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1631261178084-c9f7d50941c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDV8MzE3MDk5fHx8fHwyfHwxNjMxNDUzODQ3&ixlib=rb-1.2.1&q=80&w=400',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1631219892100-608317dd6c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDN8MzE3MDk5fHx8fHwyfHwxNjMxNDUzODQ3&ixlib=rb-1.2.1&q=80&w=400',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1631261178084-c9f7d50941c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDV8MzE3MDk5fHx8fHwyfHwxNjMxNDUzODQ3&ixlib=rb-1.2.1&q=80&w=400',
    },
  ];

  function handleSetBackground(value: string) {
    setBackground(value);
  }

  function setBackgroundStyle() {
    if (background.includes('https') || background.includes('http')) {
      return `url(${background})`;
    }
    return background;
  }

  return (
    <div
      style={{ zIndex: 999 }}
      className="fixed top-0 left-0 w-screen h-screen"
    >
      <CreateForm>
        <div className="flex">
          <div
            className="relative rounded p-4"
            style={{ width: 296, background: `${setBackgroundStyle()}` }}
          >
            <div>
              <InputText
                className="rounded"
                type="text"
                autoComplete="off"
                {...register('name')}
                placeholder="Board Title"
              />
              <input
                type="text"
                {...register('background')}
                value={background}
                className="w-0 h-0"
              />
            </div>
            <button
              style={{ width: 16, height: 16 }}
              className="absolute grid place-items-center bg-transparent text-white top-1 right-1"
              onClick={closeModal}
            >
              <CloseIcon style={{ width: 14, height: 14 }} />
            </button>
          </div>
          <ul className="grid grid-cols-3 gap-x-2 ml-3">
            {listImage.map((image) => (
              <li
                style={{ width: 28, height: 28 }}
                className="mb-2"
                key={image.id}
              >
                <button
                  className="w-full h-full"
                  style={{ backgroundImage: `url(${image.url})` }}
                  onClick={() => handleSetBackground(image.url)}
                ></button>
              </li>
            ))}
            {listColors.map((color) => (
              <li style={{ width: 28, height: 28 }} key={color.id}>
                <button
                  style={{ backgroundColor: color.color }}
                  className="w-full h-full"
                  onClick={() => handleSetBackground(color.color)}
                ></button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex mt-3">
          <SubmitButton onClick={handleSubmit((data) => submit(data))}>
            Create Board
          </SubmitButton>
          <ProjectName
            style={{ backgroundColor: '#055A8C' }}
            className="flex-1 ml-5"
          >
            {project?.name}
          </ProjectName>
        </div>
      </CreateForm>
      <Overlay />
    </div>
  );
};
