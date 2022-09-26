import React from "react";
import styled from "styled-components";

const List = styled.ul`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
`;
// const List = ({ children }) => {
//   return <StyledUl>{children}</StyledUl>;
// };

export default List;
