import { Column } from 'components/Column';
import { FC, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { mockData as _board } from './mock-data';

const BoardPage: FC<any> = () => {
  const background =
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2239x1600/9cd9d9e923c9fa0cb96ac27418fad55c/photo-1630980260348-16f484cb6471.jpg';
  const [board, setBoard] = useState(_board);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    console.log(draggableId);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'list') {
      const newListOrder = [...board.lists];
      const movedList = board.lists[source.index];
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, movedList);

      const newBoard = {
        ...board,
        lists: newListOrder,
      };

      setBoard(newBoard);
    }

    if (source.droppableId === destination.droppableId) {
      const newBoard = {
        ...board,
      };

      const list = newBoard.lists.find(
        (list) => list.id === source.droppableId
      );

      if (!list) {
        return;
      }

      const newListTicket = [...list.tickets];
      const moveTicket = newListTicket[source.index];
      newListTicket.splice(source.index, 1);
      newListTicket.splice(destination.index, 0, moveTicket);

      list.tickets = newListTicket;

      setBoard(newBoard);
    } else {
      const newBoard = {
        ...board,
      };

      const destList = newBoard.lists.find(
        (list) => list.id === destination.droppableId
      );
      const sourceList = newBoard.lists.find(
        (list) => list.id === source.droppableId
      );

      if (destList && sourceList) {
        const movedTicket = sourceList.tickets[source.index];
        const newDestTickets = destList.tickets;
        const newSourceTickets = sourceList.tickets;

        newDestTickets.splice(destination.index, 0, movedTicket);
        newSourceTickets.splice(source.index, 1);

        destList.tickets = newDestTickets;
        sourceList.tickets = newSourceTickets;

        setBoard(newBoard);
      }
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="h-screen w-screen flex flex-col"
    >
      <div
        style={{ backgroundColor: 'transparent', height: 45, width: '100%' }}
      ></div>
      <div className="flex-1 flex flex-col">
        <div style={{ height: 45, width: '100%', backgroundColor: 'black' }}>
          Board Utility
        </div>
        <div className="flex-1">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-lists"
              type="list"
              direction="horizontal"
            >
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {board.lists.map((list, index) => (
                    <Column key={list.id} index={index} list={list}></Column>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
