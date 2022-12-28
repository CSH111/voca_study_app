import styled from "styled-components";

const Devider = styled.div`
  width: 100%;
  height: ${({ width }) => width ?? "1px"};
  background-color: ${({ color }) => color ?? "gray"};
  margin: ${({ margin }) => margin ?? "0 0 0 0"};
`;

export default Devider;
