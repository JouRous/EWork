import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Ticket } from 'components/Ticket';
import { IList } from '../../models/IList';
import http from 'services/http-service';
import { ITicket } from 'models/ITicket';

const Container = styled.div`
  box-sizing: border-box;
  display: inline-block;
  margin: 0 4px;
  height: calc(100vh - 100px);
  vertical-align: top;
  white-space: nowrap;
  width: 272px;
`;

const ColumnContent = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
`;

interface IProps {
  list: IList;
  index: number;
}

export const Column: FC<IProps> = ({ list, index }) => {
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    http
      .get<ITicket[]>(`/api/v1/listitem/${list.id}/tickets`)
      .subscribe((data) => setTickets(data));
  }, [list]);

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex"
        >
          <ColumnContent>
            <div>{list.name}</div>
            <Droppable droppableId={list.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {tickets.map((ticket, index) => (
                    <Ticket key={ticket.id} ticket={ticket} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </ColumnContent>
        </Container>
      )}
    </Draggable>
  );
};
