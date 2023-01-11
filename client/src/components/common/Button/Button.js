import styled, { css } from "styled-components";

const Button = ({
  children,
  onClick,
  fontSize,
  width,
  height,
  margin,
  color,
  themeColor,
  shadow,
  ...rest
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick && onClick(e);
  };
  return (
    <StyledButton
      fontSize={fontSize}
      width={width}
      height={height}
      margin={margin}
      themeColor={themeColor}
      color={color}
      onClick={handleClick}
      shadow={shadow}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  font-size: ${({ fontSize }) => fontSize ?? "20px"};
  width: ${({ width }) => width ?? "auto"};
  height: ${({ height }) => height ?? "auto"};
  margin: ${({ margin }) => margin ?? "0"};
  color: ${({ color }) => color ?? "auto"};
  padding: ${(p) => p.padding ?? "5px 10px"};
  border-radius: 0.3rem;
  border: none;
  transition: all 0.15s;
  background-color: transparent;
  box-shadow: ${(p) => (p.shadow ? "1px 1px 3px 1px #7a7a7a" : "none")};
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
  ${(p) =>
    p.themeColor === "green" &&
    css`
      background-color: #4caf50;
      color: white;
      &:hover:enabled {
        background-color: #348136;
      }
    `}
  &:active:enabled {
    transform: scale(0.95);
  }
`;
//
