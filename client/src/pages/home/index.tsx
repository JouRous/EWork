import { IProject } from 'models/IProject';
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ListWorkspace } from 'components/ListWorkspace';
import { Sidebar } from 'components/Sidebar';
import http from 'services/http-service';
import { forkJoin } from 'rxjs';

interface IProps {}

const HomeContainer = styled.div`
  min-height: calc(100vh - 45px);
  background-color: rgb(250, 251, 252);
  margin-top: 45px;
`;

const HomePage: FC<IProps> = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [guestProjects, setGuestProjects] = useState<IProject[]>([]);

  useEffect(() => {
    async function fetchApi() {
      const project$ = http.get<IProject[]>('/api/v1/project');
      const guestProjects$ = http.get<IProject[]>('/api/v1/project/guest');
      forkJoin([project$, guestProjects$]).subscribe((data) => {
        setProjects(data[0]);
        setGuestProjects(data[1]);
      });
    }

    fetchApi();
  }, []);

  return (
    <HomeContainer className="flex items-start justify-center">
      <Sidebar />
      <ListWorkspace projects={projects} guestProjects={guestProjects} />
    </HomeContainer>
  );
};

export default HomePage;
