import { FC, useState } from 'react';
import http from 'services/http-service';
import { useAppSelector } from 'store/hooks';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { IComment } from 'models/IComment';

const Input = styled.input`
  height: 35px;
`;

interface IProps {
  ticketId: string;
  addComment: (comment: IComment) => void;
}

export const CommentForm: FC<IProps> = ({ ticketId, addComment }) => {
  const { register, handleSubmit, setValue } =
    useForm<{ [key: string]: string }>();
  const [visible, setVisible] = useState<string>('hidden');
  const currentUser = useAppSelector((state) => state.auth.user);

  const sendComment = (data: any) => {
    console.log(data);
    http
      .post<IComment>(`/api/v1/comment`, {
        ticketId,
        userId: currentUser?.id,
        content: data.content,
      })
      .subscribe((response) => {
        setVisible('hidden');
        setValue('content', '');
        addComment(response.data);
      });
  };

  return (
    <>
      <Input
        className="block w-full p-2 mb-1"
        type="text"
        placeholder="Write a comment..."
        autoComplete="off"
        {...register('content')}
        onClick={() => setVisible('flex')}
      />
      <div className={`btn-send ${visible}`}>
        <button
          className="block top-0 right-0 h-full px-2 py-1 text-white"
          style={{ backgroundColor: 'rgb(0, 121, 191)' }}
          onClick={handleSubmit((data) => sendComment(data))}
        >
          Send
        </button>
        <button
          onClick={() => setVisible('hidden')}
          className="block ml-2 h-full p-1"
        >
          X
        </button>
      </div>
    </>
  );
};
