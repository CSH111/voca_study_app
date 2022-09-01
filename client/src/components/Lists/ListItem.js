import styled from "styled-components";

const StyledLi = styled.li`
  height: 70px;
  width: 100%;
  border: solid 1px black;
  background-color: #f5f5f6;
  margin-top: 1rem;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div:last-child {
    /* background-color: red; */
    align-self: flex-start;
  }
`;
const ListItem = ({ className, children }) => {
  return <StyledLi className={className}>{children}</StyledLi>;
};

export default ListItem;
