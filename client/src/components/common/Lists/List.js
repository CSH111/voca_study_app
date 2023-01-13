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
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(p) => p.theme.color.gray.main};
    border-radius: 50px;
  }
  &::-webkit-scrollbar-track {
  }
  > .list-spinner {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 2.5rem;
  }
  scroll-behavior: smooth;
  padding: 0 8px;
`;

export default List;
