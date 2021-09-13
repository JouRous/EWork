import { CreateBoardModal } from 'components/CreateBoardModal';
import { IBoard } from 'models/IBoard';
import { IProject } from 'models/IProject';
import { FC, useEffect, useState } from 'react';
import http from 'services/http-service';
import { Card } from './Card';
import { CreateBoardButton } from './CreateBoardButton';

interface IProps {
  project: IProject;
}

export const ListBoard: FC<IProps> = ({ project }) => {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  useEffect(() => {
    function fetchBoards() {
      http
        .get<IBoard[]>(`/api/v1/project/${project.id}/boards`)
        .subscribe((data) => {
          setBoards(data);
          setLoading(false);
        });
    }

    if (loading) {
      fetchBoards();
    }
  }, [project, loading]);

  function handleCreateBoard(data: any) {
    const body = {
      name: data.name,
      background: data.background,
      projectId: project.id,
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
        <div className="grid grid-cols-4 gap-4">
          {boards.map((board) => (
            <Card key={board.id} board={board} />
          ))}
          <CreateBoardButton openForm={openModal} />
        </div>
      </div>
      {isFormOpen ? (
        <CreateBoardModal
          project={project}
          closeModal={closeModal}
          submit={handleCreateBoard}
        />
      ) : null}
    </>
  );
};
