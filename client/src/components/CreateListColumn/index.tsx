import styled from 'styled-components';

const Wrapper = styled.div`
  box-sizing: border-box;
  display: inline-block;
  margin: 0 4px;
  vertical-align: top;
  white-space: nowrap;
  width: 272px;
  height: auto;
  padding: 4px;
  transition: background 85ms ease-in, opacity 40ms ease-in,
    border-color 85ms ease-in;
`;

const CreateButton = styled.button`
  display: block;
  cursor: pointer;
  background-color: #ffffff3d;
  width: 100%;
  font-size: 14px;
  color: #fff;
  padding: 6px 8px;
  transition: color 85ms ease-in;
`;

export const CreateBoardColumn = () => {
  return (
    <Wrapper>
      <CreateButton className="rounded">Add another list</CreateButton>
    </Wrapper>
  );
};
