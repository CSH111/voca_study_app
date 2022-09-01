import React from "react";
import styled from "styled-components";

const StyledUl = styled.ul`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const List = ({ children }) => {
  return <StyledUl>{children}</StyledUl>;
};

export default List;
