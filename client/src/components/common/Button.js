import styled from "styled-components";

const Button = styled.button`
  font-size: ${({ fontSize }) => fontSize ?? "20px"};
  width: ${({ width }) => width ?? "auto"};
  height: ${({ height }) => height ?? "auto"};
  margin: ${({ margin }) => margin ?? "auto"};
  color: ${({ color }) => color ?? "auto"};
  border-radius: 0.3rem;
  border: none;
  transition: all 0.2s;
  background-color: transparent;
  /* cursor: pointer; */
  &:hover:enabled {
    background-color: #b2b2b2;
    cursor: pointer;
  }
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;
//

export default Button;
