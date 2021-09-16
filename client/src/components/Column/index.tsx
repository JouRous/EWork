import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Ticket } from 'components/Ticket';
import { IList } from '../../models/IList';
import http from 'services/http-service';

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
  listId: string;
  index: number;
}

export const Column: FC<IProps> = ({ listId, index }) => {
  const listInit = { id: '', name: '', tickets: [] } as IList;
  const [list, setList] = useState<IList>(listInit);

  useEffect(() => {
    http
      .get<IList>(`/api/v1/listitem/${listId}`)
      .subscribe((data) => setList(data));
  }, [listId]);

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex"
        >
          <ColumnContent>
            <div>{list.name}</div>
            <Droppable droppableId={listId}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {list.tickets.map((ticket, index) => (
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
