import React from "react";
import styled from "styled-components";

const StyledUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  li {
    width: 100%;
    margin-top: 2rem;
  }
`;
const List = ({ children }) => {
  return <StyledUl>{children}</StyledUl>;
};

export default List;
