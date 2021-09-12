import { IProject } from 'models/IProject';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ListWorkspace } from 'components/ListWorkspace';
import { Sidebar } from 'components/Sidebar';
import http from 'services/http-service';
import { forkJoin } from 'rxjs';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { fetchProjectSuccess } from 'store/features/project/projectSlice';
import { CreateProjectModal } from 'components/CreateProjectModal';

interface IProps {}

const HomeContainer = styled.div`
  min-height: calc(100vh - 45px);
  background-color: rgb(250, 251, 252);
  margin-top: 45px;
`;

const HomePage: FC<IProps> = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [guestProjects, setGuestProjects] = useState<IProject[]>([]);

  const isLoadProject = useAppSelector((state) => state.project.isLoadProject);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchApi() {
      const project$ = http.get<IProject[]>('/api/v1/project');
      const guestProjects$ = http.get<IProject[]>('/api/v1/project/guest');
      forkJoin([project$, guestProjects$]).subscribe((data) => {
        setProjects(data[0]);
        setGuestProjects(data[1]);
        dispatch(fetchProjectSuccess());
      });
    }

    fetchApi();
  }, [isLoadProject, dispatch]);

  return (
    <>
      <HomeContainer className="flex items-start justify-center">
        <Sidebar projects={projects} />
        <ListWorkspace projects={projects} guestProjects={guestProjects} />
      </HomeContainer>
      <CreateProjectModal />
    </>
  );
};

export default HomePage;
