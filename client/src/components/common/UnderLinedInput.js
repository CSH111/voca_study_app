import styled from "styled-components";

const UnderLinedInput = styled.input`
  border: none;
  border-bottom: solid 1px ${(p) => p.theme.color.primary.main};
  height: 30px;
  display: inline;
  width: ${(p) => p.width ?? "150px"};
  font-size: 16px;
  background: none;
  &:focus {
    outline: none;
  }
`;

export default UnderLinedInput;
