import { CreateBoardModal } from 'components/CreateBoardModal';
import { IBoard } from 'models/IBoard';
import { FC, useEffect, useState } from 'react';
import http from 'services/http-service';
import { Card } from './Card';
import { CreateBoardButton } from './CreateBoardButton';

interface IProps {
  projectId: string;
}

export const ListBoard: FC<IProps> = ({ projectId }) => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  useEffect(() => {
    function fetchBoards() {
      http
        .get<IBoard[]>(`/api/v1/project/${projectId}/boards`)
        .subscribe((data) => {
          console.log(data);
          setBoards(data);
          setLoading(false);
        });
    }

    if (loading) {
      fetchBoards();
    }
  }, [projectId, loading]);

  function handleCreateBoard(data: any) {
    const body = {
      name: data.name,
      projectId,
    };

    http.post('/api/v1/board', body).subscribe((response) => {
      setIsFormOpen(false);
      setLoading(true);
    });
  }

  function openModal() {
    setIsFormOpen(true);
  }

  function closeModal() {
    setIsFormOpen(false);
  }

  return (
    <>
      <div className="mt-2">
        <div className="grid grid-cols-4 gap-x-4">
          {boards.map((board) => (
            <Card key={board.id} board={board} />
          ))}
          <CreateBoardButton openForm={openModal} projectId={projectId} />
        </div>
      </div>
      {isFormOpen ? (
        <CreateBoardModal closeModal={closeModal} submit={handleCreateBoard} />
      ) : null}
    </>
  );
};
