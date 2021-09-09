import { IProject } from 'models/project';
import { FC, useEffect, useState } from 'react';
import http from 'services/http-service';
import styled from 'styled-components';
import { ListWorkspace } from '../../components/ListWorkspace';
import { Sidebar } from '../../components/Sidebar';

interface IProps {}

const HomeContainer = styled.div`
  min-height: calc(100vh - 45px);
  background-color: rgb(250, 251, 252);
  margin-top: 45px;
`;

const HomePage: FC<IProps> = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    async function fetchApi() {
      const res = await http.get<IProject[]>('/api/v1/project');
      setProjects(res.data);
    }

    fetchApi();
  }, []);

  return (
    <HomeContainer className="flex items-start justify-center">
      <Sidebar />
      <ListWorkspace projects={projects} />
    </HomeContainer>
  );
};

export default HomePage;
