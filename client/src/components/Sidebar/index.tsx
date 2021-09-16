import styled from 'styled-components';
import { SidebarItemTab } from './SidebarItemTab';
import { ReactComponent as BoardIcon } from 'assets/icons/board-icon.svg';
import { TabLink } from './TabLink';
import { FC } from 'react';
import { IProject } from 'models/IProject';
import { useAppDispatch } from 'store/hooks';
import { openModal } from 'store/features/project/projectSlice';

const SidebarContainer = styled.div`
  width: 240px;
  position: sticky;
  top: 0;
  background-color: '#FAFBFC';
`;

interface IProps {
  projects: IProject[];
}

export const Sidebar: FC<IProps> = ({ projects }) => {
  const dispatch = useAppDispatch();

  function openCreateModal() {
    dispatch(openModal());
  }

  return (
    <>
      <SidebarContainer className="px-2 pt-4">
        <ul>
          <li className="">
            <TabLink to="/">
              <span>
                <BoardIcon style={{ width: 14 }} />
              </span>
              <span className="font-bold mx-2">Board</span>
            </TabLink>
          </li>
        </ul>

        <h3
          style={{ paddingLeft: 8, paddingRight: 8 }}
          className="flex justify-between items-center cursor-default my-3"
        >
          <span className="uppercase">Workspaces</span>
          <button className="text-lg" onClick={openCreateModal}>
            +
          </button>
        </h3>
        <ul>
          {projects.map((project) => (
            <SidebarItemTab key={project.id} project={project} />
          ))}
        </ul>
      </SidebarContainer>
    </>
  );
};
