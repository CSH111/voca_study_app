import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  &:focus {
    outline: none;
  }
`;

const InputBox = React.forwardRef((props, ref) => {
  return (
    <StyledInput
      ref={ref}
      id={props.id}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
    ></StyledInput>
  );
});

export default InputBox;
