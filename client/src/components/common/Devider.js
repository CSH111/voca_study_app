import styled from "styled-components";

const Devider = ({ width, color, margin, children, className, themeColor }) => (
  <StyledDevider
    width={width}
    color={color}
    margin={margin}
    className={className}
    themeColor={themeColor}
  >
    {children}
  </StyledDevider>
);

const StyledDevider = styled.div`
  width: 100%;
  min-height: ${({ width }) => width ?? "1px"};
  margin: ${({ margin }) => margin ?? "0 0 0 0"};
  background-color: ${({ theme, themeColor: { color, level } = {} }) =>
    theme.color[color ?? "primary"][level ?? "main"] ?? "black"};
`;

export default Devider;
