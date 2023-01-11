import styled from "styled-components";

const ListItem = styled.li`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transition: all 0.15s;
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
  }
  .blur-filter {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #cacaca79;
  }
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.75rem;
  }
  > div {
    min-height: 60px;
  }
`;

export default ListItem;
