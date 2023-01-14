import styled from "styled-components";

const ListItem = styled.li`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.15s;
  min-height: 65px;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme.color.gray.light};
  }
  .blur-filter {
    z-index: 10;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${(p) => p.theme.color.gray.trans};
  }
  .spinner {
    z-index: 11;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > *:not(:last-child) {
    margin-right: 5px;
  }
`;

export default ListItem;
