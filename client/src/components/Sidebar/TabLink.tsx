import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const TabLink = styled(Link)`
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
