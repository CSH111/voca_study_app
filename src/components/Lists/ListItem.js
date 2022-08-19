import styled from "styled-components";

const StyledLi = styled.li`
  border: solid 1px black;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  height: 75px;
  align-items: center;
`;
const ListItem = ({ className, children }) => {
  return <StyledLi className={className}>{children}</StyledLi>;
};

export default ListItem;
