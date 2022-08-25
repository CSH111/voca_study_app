import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 2.5rem;
  height: 2rem;
  font-size: 1.5rem;
  border-radius: 0.3rem;
  /* padding: 0.4rem; */
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #ffc488ff;
  }
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
