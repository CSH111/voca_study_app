import styled from "styled-components";

const InputBox = styled.input`
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

export default InputBox;
