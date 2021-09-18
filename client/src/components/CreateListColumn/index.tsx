import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  display: inline-block;
  margin: 0 4px;
  vertical-align: top;
  white-space: nowrap;
  width: 272px;
  height: auto;
  padding: 4px;
  transition: background 85ms ease-in, opacity 40ms ease-in,
    border-color 85ms ease-in;
`;

const CreateButton = styled.button`
  display: block;
  cursor: pointer;
  background-color: #ffffff3d;
  width: 100%;
  font-size: 14px;
  color: #fff;
  padding: 6px 8px;
  transition: color 85ms ease-in;
`;

const AddForm = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
`;

const Input = styled.input`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  /* height: 54px; */
  width: 100%;
  color: #172b4d;
  border: unset;

  &:focus {
    box-shadow: none;
    outline: none;
  }
`;

interface IProps {
  addList: (list: any) => void;
}

export const CreateBoardColumn: FC<IProps> = ({ addList }) => {
  const [isToggle, setToggle] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ name: string }>();
  return (
    <Wrapper>
      {isToggle ? (
        <div style={{ backgroundColor: '#EBECF0' }} className="p-2">
          <AddForm className="px-2">
            <Input
              className="py-1"
              {...register('name')}
              placeholder="Enter list title..."
            />
          </AddForm>
          <div>
            <div>
              <button
                className="px-2 py-1 rounded"
                style={{
                  backgroundColor: '#0079bf',
                  border: 'none',
                  boxShadow: 'none',
                  color: '#fff',
                }}
                onClick={handleSubmit((data: { name: string }) => {
                  addList(data);
                  setToggle(false);
                  reset({ name: '' });
                })}
              >
                Add card
              </button>
              <button className="ml-3" onClick={() => setToggle(false)}>
                X
              </button>
            </div>
          </div>
        </div>
      ) : (
        <CreateButton onClick={() => setToggle(true)} className="rounded">
          Add another list
        </CreateButton>
      )}
    </Wrapper>
  );
};
