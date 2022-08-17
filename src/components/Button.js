import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: lightcyan;
  width: 2.5rem;
  height: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  &.bookmark {
    color: ${({ isBookmarked }) => (isBookmarked ? "#ffcc11ff" : "#d7d7d7ff")};
  }
`;
const Button = (props) => {
  return (
    <StyledButton
      onClick={props.onClick}
      isBookmarked={props.isBookmarked}
      className={props.className}
      disabled={props.disabled}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
