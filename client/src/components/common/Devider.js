import styled from "styled-components";

const Devider = ({ width, color, margin, children, className }) => (
  <StyledDevider width={width} color={color} margin={margin} className={className}>
    {children}
  </StyledDevider>
);

const StyledDevider = styled.div`
  width: 100%;
  min-height: ${({ width }) => width ?? "1px"};
  background-color: ${({ color }) => color ?? "gray"};
  margin: ${({ margin }) => margin ?? "0 0 0 0"};
`;

export default Devider;
