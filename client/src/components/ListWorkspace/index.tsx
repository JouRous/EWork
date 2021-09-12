import { IProject } from 'models/IProject';
import { FC } from 'react';
import styled from 'styled-components';
import { ListBoard } from './ListBoard';
import { WorkspaceItem } from './WorkspaceItem';

const Wrapper = styled.div`
  max-width: 850px;
  min-width: 288px;
  width: 100%;
`;

const SectionTitle = styled.h3`
  align-items: center;
  color: #5e6c84;
  display: flex;
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  margin: 20px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface IProps {
  projects: IProject[];
  guestProjects: IProject[];
}

export const ListWorkspace: FC<IProps> = ({ projects, guestProjects }) => {
  return (
    <Wrapper className="ml-4">
      <div>
        <SectionTitle className="uppercase">Your Workspaces</SectionTitle>
        {projects.map((project) => (
          <div className="mb-6" key={project.id}>
            <WorkspaceItem project={project} />
            <ListBoard projectId={project.id} />
          </div>
        ))}
        <SectionTitle className="uppercase">Guest Workspaces</SectionTitle>
        {guestProjects.map((project) => (
          <div>
            <WorkspaceItem project={project} />
            <ListBoard projectId={project.id} />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
