import styled from "styled-components";

const StyledLi = styled.li`
  border: solid 1px black;
  background-color: #f5f5f6;
  overflow: hidden;

  display: flex;
  justify-content: space-between;
  height: 75px;
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
