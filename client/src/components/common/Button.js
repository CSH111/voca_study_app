import styled, { css } from "styled-components";

const StyledButton = styled.button`
  font-size: ${({ fontSize }) => fontSize ?? "20px"};
  width: ${({ width }) => width ?? "auto"};
  height: ${({ height }) => height ?? "auto"};
  margin: ${({ margin }) => margin ?? "0"};
  color: ${({ color }) => color ?? "auto"};
  padding: ${(p) => p.padding ?? "5px 10px"};
  border-radius: 0.3rem;
  border: none;
  transition: all 0.2s;
  background-color: transparent;
  /* cursor: pointer; */
  &:hover:enabled {
    background-color: #b2b2b2;
    cursor: pointer;
  }
  ${(p) =>
    p.themeColor === "gray" &&
    css`
      background-color: #d1d1d1;
    `}
  ${(p) =>
    p.themeColor === "red" &&
    css`
      background-color: #f04040;
      color: white;
      &:hover:enabled {
        background-color: #b01515;
      }
    `}
`;
//

const Button = ({ children, onClick, ...rest }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick && onClick(e);
  };
  return (
    <StyledButton {...rest} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
