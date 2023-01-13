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
  variant,
  angleBorder,
  propagation,
  ...rest
}) => {
  const handleClick = (e) => {
    if (!propagation) {
      e.stopPropagation();
    }
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
      angleBorder={angleBorder}
      shadow={shadow}
      variant={variant}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize ?? "20px"};
  width: ${({ width }) => width ?? "auto"};
  height: ${({ height }) => height ?? "auto"};
  margin: ${({ margin }) => margin ?? "0"};
  padding: ${(p) => p.padding ?? "5px 10px"};
  border-radius: ${(p) => (p.angleBorder ? "none" : "5px")};
  border: none;
  transition: all 0.15s;
  background-color: transparent;
  color: ${({ theme, themeColor }) =>
    theme.color[themeColor]?.main ?? theme.fontColor.primary.main};

  &:hover {
    background-color: ${(p) => p.theme.color.gray.main};
    cursor: pointer;
  }
  ${({ variant }) =>
    variant === "contained" &&
    css`
      background-color: ${({ theme, themeColor }) =>
        theme.color[themeColor]?.main ?? "transparent"};
      color: ${({ theme, themeColor }) =>
        theme.color[themeColor]?.fontColor ?? theme.fontColor.primary.main};
      box-shadow: ${(p) => (p.shadow ? `2px 2px 4px 0px ${p.theme.color.shadow.dark}` : "none")};

      &:hover {
        background-color: ${({ theme, themeColor }) =>
          theme.color[themeColor]?.dark ?? theme.color[themeColor]?.light ?? theme.color.gray.main};
      }
    `}

  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    color: ${(p) => p.theme.color.gray.dark};
    box-shadow: none;
    pointer-events: none;
  }
`;
