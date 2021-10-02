import { ITicket } from 'models/ITicket';
import { FC, useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import http from 'services/http-service';
import { closeCard } from 'store/features/ticket/ticketSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import styled from 'styled-components';
import { ReactComponent as BoardIcon } from 'assets/icons/board-icon.svg';
import { useForm } from 'react-hook-form';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
`;

const ActionButton = styled.button`
  background-color: #091e420a;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  height: 32px;
  width: 100%;
  margin-top: 8px;
  max-width: 300px;
  overflow: hidden;
  padding: 6px 12px;
  position: relative;
  text-overflow: ellipsis;
  transition-duration: 85ms;
  transition-property: background-color, border-color, box-shadow;
  transition-timing-function: ease;
  user-select: none;
  white-space: nowrap;
  text-align: left;
`;

interface IProps {
  closeTicketPopup: (ticket: ITicket) => void;
}

export const TicketDetail: FC<IProps> = ({ closeTicketPopup }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const ticketId = useAppSelector((state) => state.ticket.ticketId);
  const isOpen = useAppSelector((state) => state.ticket.isOpen);
  const { register, handleSubmit, setValue } =
    useForm<{ [key: string]: string }>();
  const initTicket = {
    id: '',
    listId: '',
    pos: '',
    description: '',
    title: '',
  };

  const [ticket, setTicket] = useState<ITicket>(initTicket);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<boolean>(false);

  useEffect(() => {
    if (ticketId !== '') {
      http.get<ITicket>(`/api/v1/ticket/${ticketId}`).subscribe((ticket) => {
        console.log(ticket);
        setTicket(ticket);
        setValue('title', ticket.title);
        setValue('description', ticket.description);
      });
    }
  }, [ticketId, setValue]);

  const updateTicket = (data: { [key: string]: string }, field: string) => {
    console.log(data);
    http
      .path<ITicket>(`/api/v1/ticket/${ticket.id}/${field}`, data)
      .subscribe((data) => {
        console.log(data);
        setTicket(data.data);
        if (field === 'title') {
          setEditTitle(false);
        }
        if (field === 'description') {
          setEditDescription(false);
        }
      });
  };

  const closePopup = () => {
    dispatch(closeCard());
    closeTicketPopup(ticket);
    setTicket(initTicket);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div
      style={{ zIndex: 999 }}
      className=" h-screen w-screen fixed top-0 left-0 grid place-items-center"
    >
      <div
        style={{
          width: 768,
          zIndex: 900,
          backgroundColor: '#F4F5F7',
          color: '#172b4d',
        }}
        className="px-6 py-4 rounded-sm"
      >
        <div className="flex items-center mb-3">
          <div
            style={{ fontSize: 21, width: 35, height: 35 }}
            className="grid place-items-center mr-3"
          >
            <BoardIcon />
          </div>
          {editTitle ? (
            <div className="flex-1 h-full relative">
              <input
                className="w-full font-semibold text-lg outline-none"
                type="text"
                {...register('title')}
              />
              <button
                className="block absolute top-0 right-0 h-full px-2 text-white"
                style={{ backgroundColor: 'rgb(0, 121, 191)' }}
                onClick={handleSubmit((data) => updateTicket(data, 'title'))}
              >
                Save
              </button>
            </div>
          ) : (
            <h3
              onClick={() => setEditTitle(true)}
              className="cursor-pointer font-semibold text-lg h-full"
            >
              {ticket.title}
            </h3>
          )}
          <button
            style={{ width: 30, height: 30 }}
            className="ml-auto"
            onClick={() => {
              dispatch(closeCard());
            }}
          >
            X
          </button>
        </div>
        <div className="flex">
          <div style={{ width: 562 }}>
            <div>
              <div className="flex items-center mr-1">
                <div
                  style={{ fontSize: 21, height: 35, width: 35 }}
                  className="grid place-items-center"
                >
                  <i className="fa fa-align-justify"></i>
                </div>
                <div className="h-full ml-3">Description</div>
              </div>
              <div className="flex flex-1 mt-2">
                <span
                  style={{ width: 35, height: 35 }}
                  className="block ml-3"
                ></span>
                {editDescription || !ticket.description ? (
                  <div className="w-full">
                    <textarea
                      className="w-full p-2"
                      cols={2}
                      placeholder="Add a more detailed description..."
                      {...register('description')}
                    ></textarea>
                    <div>
                      <button
                        className="block top-0 right-0 h-full px-2 py-1 text-white"
                        style={{ backgroundColor: 'rgb(0, 121, 191)' }}
                        onClick={handleSubmit((data) =>
                          updateTicket(data, 'description')
                        )}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => setEditDescription(true)}
                  >
                    {ticket.description}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center mr-1">
                <div
                  style={{ fontSize: 21, height: 35, width: 35 }}
                  className="grid place-items-center"
                >
                  <i className="fa fa-paperclip"></i>
                </div>
                <div className="h-full ml-3">Attachments</div>
              </div>
              <div className="flex flex-1 mt-2">
                <span
                  style={{ width: 35, height: 35 }}
                  className="block ml-3"
                ></span>
                <div>
                  <button>Add an attachment</button>
                </div>
              </div>
            </div>
            <div className="h-full mt-6">
              <div className="flex items-center mr-1">
                <div
                  className="grid place-items-center"
                  style={{ width: 35, height: 35, fontSize: 21 }}
                >
                  <i className="fa fa-align-left"></i>
                </div>
                <div className="ml-3">Comments</div>
              </div>
              <div className="w-full mt-2">
                <div className="flex w-full">
                  <div
                    className="rounded-full overflow-hidden mr-3"
                    style={{ width: 35, height: 35 }}
                  >
                    <Avatar name={currentUser?.username} size="35" />
                  </div>
                  <div className="flex-1">
                    <input
                      className="block h-full w-full p-2"
                      type="text"
                      placeholder="Write a comment..."
                    />
                  </div>
                </div>
                <div style={{ minHeight: 100 }}></div>
              </div>
            </div>
          </div>
          <div className="flex-1 ml-4">
            <div
              style={{
                color: '#5e6c84',
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              ADD TO TICKET
            </div>
            <div>
              <ul>
                <li>
                  <ActionButton>Members</ActionButton>
                </li>
                <li>
                  <ActionButton>Labels</ActionButton>
                </li>
                <li>
                  <ActionButton>Attachment</ActionButton>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Overlay onClick={() => closePopup()}></Overlay>
    </div>
  );
};
