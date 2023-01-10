import { forwardRef } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border: none;
  border-bottom: solid 1px black;
  height: 30px;
  display: inline;
  /* width: 100%; */
  line-height: 30px;
  font-size: 16px;
  background: none;
  &:focus {
    outline: none;
  }
`;

const InputBox = forwardRef(({ onClick, ...rest }, ref) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick && onClick(e);
  };
  return <StyledInput {...rest} onClick={handleClick} ref={ref} />;
});

InputBox.displayName = "InputBox";

export default InputBox;
