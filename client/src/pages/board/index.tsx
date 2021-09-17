import { Column } from 'components/Column';
import { CreateBoardColumn } from 'components/CreateListColumn';
import { IBoard } from 'models/IBoard';
import { IList } from 'models/IList';
import { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRouteMatch } from 'react-router';
import { forkJoin, map, mergeAll, toArray } from 'rxjs';
import http from 'services/http-service';
import { getPos } from 'utils';

const BoardPage: FC<any> = () => {
  const background =
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2239x1600/9cd9d9e923c9fa0cb96ac27418fad55c/photo-1630980260348-16f484cb6471.jpg';
  const boardInit = { id: '', name: '', lists: [] } as IBoard;
  const [board, setBoard] = useState(boardInit);
  const match = useRouteMatch<{ id: string }>();

  useEffect(() => {
    function fetchBoard() {
      const boardId = match.params.id;
      const fetchBoardRequest = http.get<IBoard>(`/api/v1/board/${boardId}`);
      const fetchTicketsRequest = http
        .get<IList[]>(`/api/v1/board/${boardId}/lists`)
        .pipe(
          mergeAll(),
          map((list) => ({
            ...list,
            tickets: list.tickets.sort(
              (a, b) => a.pos.charCodeAt(0) - b.pos.charCodeAt(0)
            ),
          })),
          toArray()
        );

      forkJoin([fetchBoardRequest, fetchTicketsRequest]).subscribe(
        (response) => {
          const board = response[0];
          const lists = response[1];
          board.lists = lists;
          setBoard(board);
        }
      );
    }

    fetchBoard();
  }, [match]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

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
      const leftList = newListOrder[destination.index - 1];
      const rightList = newListOrder[destination.index + 1];

      switch (destination.index) {
        case 0:
          movedList.pos = getPos('', rightList.pos);
          break;
        case newListOrder.length - 1:
          movedList.pos = getPos(leftList.pos, '');
          break;
        default:
          movedList.pos = getPos(leftList.pos, rightList.pos);
          break;
      }

      const newBoard = {
        ...board,
        lists: newListOrder,
      };

      http
        .post<{ pos: number }>(`/api/v1/listitem/${draggableId}/pos`, {
          pos: movedList.pos,
        })
        .subscribe((data) => data);
      setBoard(newBoard);
      return;
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
      const topTicket = newListTicket[destination.index - 1];
      const bottomTicket = newListTicket[destination.index + 1];

      switch (destination.index) {
        case 0:
          moveTicket.pos = getPos('', bottomTicket.pos);
          break;
        case newListTicket.length - 1:
          moveTicket.pos = getPos(topTicket.pos, '');
          break;
        default:
          moveTicket.pos = getPos(topTicket.pos, bottomTicket.pos);
          break;
      }

      list.tickets = newListTicket;

      http
        .post(`/api/v1/ticket/${draggableId}/move`, {
          pos: moveTicket.pos,
        })
        .subscribe((_) => {});
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
        const newDestTickets = [...destList.tickets];
        const newSourceTickets = [...sourceList.tickets];
        const movedTicket = newSourceTickets[source.index];
        const firstTicket = destList.tickets[0];
        const lastTicket = destList.tickets[destList.tickets.length - 1];

        newDestTickets.splice(destination.index, 0, movedTicket);
        newSourceTickets.splice(source.index, 1);

        if (destination.index === 0) {
          if (newDestTickets.length > 1) {
            movedTicket.pos = getPos('', firstTicket.pos);
          } else {
            movedTicket.pos = getPos('', '');
          }
        } else if (destination.index === newDestTickets.length - 1) {
          movedTicket.pos = getPos(lastTicket.pos, '');
        } else {
          movedTicket.pos = getPos(firstTicket.pos, lastTicket.pos);
        }

        http
          .post(`/api/v1/ticket/${draggableId}/move`, {
            pos: movedTicket.pos,
            listId: destination.droppableId,
          })
          .subscribe((_) => {});

        destList.tickets = newDestTickets;
        sourceList.tickets = newSourceTickets;

        setBoard(newBoard);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: '50%',
        backgroundSize: 'cover',
      }}
      className="h-screen w-screen flex flex-col"
    >
      <div
        style={{ backgroundColor: 'transparent', height: 45, width: '100%' }}
      ></div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div style={{ height: 45, width: '100%', backgroundColor: 'black' }}>
          Board Utility
        </div>
        <div className="flex-1 flex">
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
          <CreateBoardColumn />
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
