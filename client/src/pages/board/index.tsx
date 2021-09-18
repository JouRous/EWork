import { Column } from 'components/Column';
import { CreateBoardColumn } from 'components/CreateListColumn';
import { IBoard } from 'models/IBoard';
import { IList } from 'models/IList';
import { ITicket } from 'models/ITicket';
import { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRouteMatch } from 'react-router';
import { forkJoin, map, mergeAll, toArray } from 'rxjs';
import http from 'services/http-service';
import { getPos } from 'utils';
import { moveItem, reorder } from './board-utils';

const BoardPage: FC<any> = () => {
  const background =
    'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2239x1600/9cd9d9e923c9fa0cb96ac27418fad55c/photo-1630980260348-16f484cb6471.jpg';
  const boardInit = { id: '', name: '', lists: [] } as IBoard;
  const [board, setBoard] = useState(boardInit);
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
        }
      );
    }

    fetchBoard();
  }, [match, loading]);

  const addTicket = (ticket: any) => {
    http.post(`/api/v1/ticket`, ticket).subscribe((data) => {
      setLoading(true);
    });
  };

  const addList = (list: any) => {
    const lastList = board.lists[board.lists.length - 1];
    const prevPos = lastList ? lastList.pos : '';
    http
      .post(`/api/v1/listitem`, {
        name: list.name,
        boardId: board.id,
        pos: getPos(prevPos, ''),
      })
      .subscribe((data) => {
        setLoading(true);
      });
  };

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
      const [movedItem, newList] = reorder<IList>(
        board.lists,
        source.index,
        destination.index
      );

      const newBoard = {
        ...board,
        lists: newList,
      };

      http
        .post<{ pos: number }>(`/api/v1/listitem/${draggableId}/pos`, {
          pos: movedItem.pos,
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

      const [movedTicket, newListTicket] = reorder<ITicket>(
        list.tickets,
        source.index,
        destination.index
      );

      list.tickets = newListTicket;

      http
        .post(`/api/v1/ticket/${draggableId}/move`, {
          pos: movedTicket.pos,
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
        const [movedTicket, newSource, newDest] = moveItem<ITicket>(
          sourceList.tickets,
          destList.tickets,
          source,
          destination
        );

        http
          .post(`/api/v1/ticket/${draggableId}/move`, {
            pos: movedTicket.pos,
            listId: destination.droppableId,
          })
          .subscribe((_) => {});

        destList.tickets = newDest;
        sourceList.tickets = newSource;

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
      className="h-screen flex flex-col"
    >
      <div
        style={{ backgroundColor: 'transparent', height: 45, width: '100%' }}
      ></div>
      <div className="">
        <div style={{ height: 45, width: '100%', backgroundColor: 'black' }}>
          Board Utility
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" type="list" direction="horizontal">
            {(provided) => (
              <div
                className="flex overflow-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {board.lists.map((list, index) => (
                  <Column
                    key={list.id}
                    index={index}
                    list={list}
                    addTicket={addTicket}
                  ></Column>
                ))}
                {provided.placeholder}
                <CreateBoardColumn addList={addList} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default BoardPage;
