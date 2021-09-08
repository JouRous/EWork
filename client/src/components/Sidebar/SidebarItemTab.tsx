import { TabLink } from './TabLink';
import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowUpIcon } from 'assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrow-down.svg';
import { ReactComponent as BoardIcon } from 'assets/icons/board-icon.svg';
import { ReactComponent as TableIcon } from 'assets/icons/table-icon.svg';
import { ReactComponent as GroupUserIcon } from 'assets/icons/group-user.svg';
import { ReactComponent as HeartIcon } from 'assets/icons/heart-icon.svg';

const SidebarItem = styled.button`
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  box-shadow: none;
  display: flex;
  margin: 0;
  min-height: 20px;
  overflow: hidden;
  /* padding: 6px 8px 6px 0; */
  padding: 6px 8px;
  text-decoration: none;
  transition-property: background-color, border-color, box-shadow;
  transition-duration: 85ms;
  transition-timing-function: ease;

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
    color: #091e42;
  }
`;

export const SidebarItemTab = () => {
  const [isToggle, setIsToggle] = useState(false);

  function toggle() {
    setIsToggle(!isToggle);
  }

  return (
    <>
      <li>
        <SidebarItem
          onClick={toggle}
          className="w-full flex justify-between items-center cursor-pointer font-bold px-2 py-5"
        >
          <span> Workspace name</span>
          <span>
            {isToggle ? (
              <ArrowUpIcon style={{ width: 18, height: 18, lineHeight: 24 }} />
            ) : (
              <ArrowDownIcon
                style={{ width: 18, height: 18, lineHeight: 24 }}
              />
            )}
          </span>
        </SidebarItem>
        <ul
          style={{ fontSize: 12 }}
          className={`${isToggle ? 'block' : 'hidden'} pl-6`}
        >
          <li>
            <TabLink to="/">
              <span>
                <BoardIcon className="mr-2" style={{ width: 14, height: 14 }} />
              </span>
              <span>Boards</span>
            </TabLink>
          </li>
          <li>
            <TabLink to="/">
              <span>
                <HeartIcon className="mr-2" style={{ width: 14, height: 14 }} />
              </span>
              <span>Highlights</span>
            </TabLink>
          </li>
          <li>
            <TabLink to="/">
              <span>
                <TableIcon className="mr-2" style={{ width: 14, height: 14 }} />
              </span>
              <span>Workspace Table</span>
            </TabLink>
          </li>
          <li>
            <TabLink to="/">
              <span>
                <GroupUserIcon
                  className="mr-2"
                  style={{ width: 14, height: 14 }}
                />
              </span>
              <span>Member</span>
            </TabLink>
          </li>
        </ul>
      </li>
    </>
  );
};
