import { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ITicket } from '../../models/ITicket';

interface IProps {
  ticket: ITicket;
  index: number;
}

export const Ticket: FC<IProps> = ({ ticket, index }) => {
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="select-none"
        >
          {ticket.name}
        </div>
      )}
    </Draggable>
  );
};
