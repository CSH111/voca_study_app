import styled from "styled-components";

const InputBox = styled.input`
  border: none;
  border-bottom: solid 1px black;
  height: 30px;
  display: inline;
  width: 100%;
  line-height: 30px;
  font-size: 16px;
  /* flex: 1 1 0px; */
  /* padding: 0px; */
  /* width: 100%; */
  /* min-width: 100px; */
  background: none;
  &:focus {
    outline: none;
    /* background-color: #ebebeb; */
  }
`;

export default InputBox;
