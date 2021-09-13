import { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { ReactComponent as BoardIcon } from 'assets/icons/board-icon.svg';
import { ReactComponent as TableIcon } from 'assets/icons/table-icon.svg';
import { ReactComponent as GroupUserIcon } from 'assets/icons/group-user.svg';
import { IProject } from 'models/IProject';

const Button = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #091e420a;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  margin-left: 12px;
  padding: 6px 12px 6px 6px;
  position: relative;
  text-decoration: none;

  &:hover {
    background-color: #091e4214;
    border: none;
    box-shadow: none;
  }
`;

interface IProps {
  project: IProject;
}

export const WorkspaceItem: FC<IProps> = ({ project }) => {
  return (
    <div>
      <div className="flex items-center">
        <Avatar size="36" textSizeRatio={1.4} name={project.name} />
        <h1 className="flex-1 ml-2">{project?.name}</h1>
        <div className="flex">
          <Button to="">
            <BoardIcon style={{ height: 16 }} />
            <span className="ml-1">Boards</span>
          </Button>
          <Button to="">
            <TableIcon style={{ height: 12 }} />
            <span className="ml-1">Workspace Tables</span>
          </Button>
          <Button to="">
            <GroupUserIcon style={{ height: 16 }} />
            <span className="ml-1">Members</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
