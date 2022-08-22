import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
`;
// const InputBox = React.forwardRef((props,ref) => (

//     <StyledInput
// type={props.type}
// value={props.value}
// onChange={props.onChange}
//       // value={props.value}
//     />
//   );
// )

const InputBox = React.forwardRef((props, ref) => {
  return (
    <StyledInput
      ref={ref}
      id={props.id}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
    />
  );
});

export default InputBox;
