import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { openCard } from 'store/features/ticket/ticketSlice';
import { useAppDispatch } from 'store/hooks';
import styled from 'styled-components';
import { ITicket } from '../../models/ITicket';

const Wrapper = styled.div`
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

interface IProps {
  ticket: ITicket;
  index: number;
}

export const Ticket: FC<IProps> = ({ ticket, index }) => {
  const dispatch = useAppDispatch();

  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="select-none rounded px-2 py-1"
          onClick={() => dispatch(openCard('123123'))}
        >
          {ticket.title}
        </Wrapper>
      )}
    </Draggable>
  );
};
