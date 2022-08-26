import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background-color: #ffe2bc;
  border: none;
  border-radius: 2rem;
  height: 2rem;
  padding: 1rem;
  &:focus {
    outline: none;
    background-color: #ffc982;
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
