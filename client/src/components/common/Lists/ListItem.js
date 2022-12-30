import styled from "styled-components";

const ListItem = styled.li`
  position: relative;
  min-height: 70px;
  /* height: 100%; */
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  /* align-items: stretch; */
  transition: all 0.15s;
  /* cursor: ${({ cursor }) => cursor ?? "auto"}; */
  cursor: pointer;
  &:hover {
    background-color: #e6e6e6;
  }
  /* > div:last-child {
    align-self: flex-start;
  } */
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
`;

export default ListItem;
