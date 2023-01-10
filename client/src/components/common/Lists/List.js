import styled from "styled-components";

const List = styled.ul`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  > .list-spinner {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 2.5rem;
  }
`;

export default List;
