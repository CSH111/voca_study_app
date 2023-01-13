import styled, { css } from "styled-components";

const ListItem = styled.li`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.15s;
  min-height: 60px;
  cursor: pointer;
  &:hover {
    background-color: ${(p) => p.theme.color.gray.light};
  }
  > *:nth-child(1),
  > *:nth-child(2) {
    min-width: 30px;
    display: flex;
    justify-content: center;
  }
  .blur-filter {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${(p) => p.theme.color.gray.trans};
  }
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.75rem;
  }
  > *:not(:last-child) {
    margin-right: 5px;
  }
  .progress-area {
    flex: 1;
    margin-left: 5px;
  }

  h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${(p) =>
    p.forBookmark &&
    css`
      justify-content: flex-start;
    `}
`;

export default ListItem;
