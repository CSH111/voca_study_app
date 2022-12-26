import styled from "styled-components";

const Paper = ({ children, width, className, paperHeader, paperFooter }) => {
  return (
    <StyledDiv width={width} className={className}>
      <div className="paper-header">{paperHeader}</div>
      <div className="paper-body">{children}</div>
      <div className="paper-footer">{paperFooter}</div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background-color: white;
  min-height: 400px;
  width: ${(p) => p.width ?? "400px"};
  box-shadow: 3px 3px 6px 2px gray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  .paper-footer {
    align-self: center;
    min-height: 50px;
    display: flex;
    align-items: center;
  }
`;
export default Paper;
