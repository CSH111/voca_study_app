import styled from "styled-components";

const Button = styled.button`
  font-size: 1.5rem;
  border-radius: 0.3rem;
  border: none;
  transition: all 0.2s;
  background-color: #cdcdcd;
  /* cursor: pointer; */
  &:hover:enabled {
    background-color: #ffc488ff;
    cursor: pointer;
  }
`;
//

export default Button;
