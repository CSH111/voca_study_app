import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 1.5rem;
  border-radius: 0.3rem;
  border: none;
  transition: all 0.2s;
  background-color: #cdcdcd;
  ${({ disabled }) => {
    if (!disabled) {
      return `
      &:hover {
       background-color: #ffc488ff;
       cursor: pointer;
      }
      `;
    }
  }}
`;
//
const Button = (props) => {
  return (
    <StyledButton
      onClick={props.onClick}
      className={props.className}
      disabled={props.disabled}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
