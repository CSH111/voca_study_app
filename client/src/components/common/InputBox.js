import styled from "styled-components";

const InputBox = styled.input`
  border: none;
  border-bottom: solid 1px black;
  height: 30px;
  padding: 5px;
  /* width: 100%; */
  /* min-width: 100px; */
  background: none;
  &:focus {
    outline: none;
    /* background-color: #ebebeb; */
  }
`;

export default InputBox;
