import { FC, useState } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Ticket } from 'components/Ticket';
import { IList } from '../../models/IList';
import { useForm } from 'react-hook-form';
import { getPos } from 'utils';

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

const AddCardButton = styled.button`
  display: block;
  cursor: pointer;
  background-color: transparent;
  width: 100%;
  font-size: 14px;
  color: #5e6c84;
  font-weight: 600;
  padding: 6px 8px;
  transition: color 85ms ease-in;
`;

const AddCardForm = styled.div`
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

const Input = styled.textarea`
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 54px;
  width: 100%;
  color: #172b4d;
  border: unset;

  &:focus {
    box-shadow: none;
    outline: none;
  }
`;

interface IProps {
  list: IList;
  index: number;
  addTicket: (ticket: any) => void;
}

export const Column: FC<IProps> = ({ list, index, addTicket }) => {
  const [isToggle, setIsToggle] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex flex-shrink-0"
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

            {isToggle ? (
              <div>
                <AddCardForm className="px-2 pt-1">
                  <Input
                    {...register('name')}
                    placeholder="Enter card title..."
                  />
                </AddCardForm>
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
                        const bottomTicket =
                          list.tickets[list.tickets.length - 1];
                        const prevPos = bottomTicket ? bottomTicket.pos : '';

                        addTicket({
                          name: data.name,
                          listId: list.id,
                          pos: getPos(prevPos, ''),
                        });
                        setIsToggle(false);
                        reset({ name: '' });
                      })}
                    >
                      Add card
                    </button>
                    <button className="ml-3" onClick={() => setIsToggle(false)}>
                      X
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <AddCardButton
                onClick={() => setIsToggle(true)}
                className="text-left"
              >
                Add another card
              </AddCardButton>
            )}
          </ColumnContent>
        </Container>
      )}
    </Draggable>
  );
};
