import styled from "styled-components";

const Paper = ({ children, width, className }) => {
  return (
    <StyledDiv width={width} className={className}>
      {children}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background-color: white;
  height: 300px;
  width: ${(p) => p.width ?? "300px"};
  box-shadow: 3px 3px 6px 2px gray;
`;
export default Paper;
