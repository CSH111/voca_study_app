import styled from "styled-components";

const StyledLi = styled.li`
  position: relative;
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
  .blur-filter {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ffffff79;
  }
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.75rem;
  }
`;
const ListItem = ({ className, children }) => {
  return <StyledLi className={className}>{children}</StyledLi>;
};

export default ListItem;
