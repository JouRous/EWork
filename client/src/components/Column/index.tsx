import { FC } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Ticket } from 'components/Ticket';
import { IList } from '../../models/IList';

const Container = styled.div`
  box-sizing: border-box;
  display: inline-block;
  margin: 0 4px;
  padding: 4px;
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

const ListTitle = styled.div`
  display: block;
  cursor: pointer;
  background-color: transparent;
  width: 100%;
  font-size: 14px;
  color: #172b4d;
  font-weight: 600;
  padding: 6px 8px;
  transition: color 85ms ease-in;
`;

interface IProps {
  list: IList;
  index: number;
}

export const Column: FC<IProps> = ({ list, index }) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex"
        >
          <ColumnContent className="p-3">
            <ListTitle>{list.name}</ListTitle>
            <Droppable droppableId={list.id}>
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
