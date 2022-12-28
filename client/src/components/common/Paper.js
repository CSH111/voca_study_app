import styled from "styled-components";

const Paper = ({ children, width, className, paperHeader, paperFooter, bodyAlign, flex }) => {
  return (
    <StyledDiv width={width} className={className} flex={flex}>
      {paperHeader && <div className="paper-header">{paperHeader}</div>}
      <Body bodyAlign={bodyAlign}>{children}</Body>
      {paperFooter && <div className="paper-footer">{paperFooter}</div>}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background-color: white;
  flex: ${({ flex }) => flex ?? "none"};
  margin-bottom: 10%;
  margin-top: 10%;
  min-height: 400px;
  width: ${(p) => p.width ?? "400px"};
  box-shadow: 3px 3px 6px 2px gray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  .paper-header {
    margin-bottom: 20px;
  }
  .paper-footer {
    align-self: center;
    min-height: 50px;
    display: flex;
    align-items: center;
  }
  /* .paper-body {
    flex: 1;
  } */
`;
const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${({ bodyAlign }) => bodyAlign ?? "center"};
  /* align-items: stretch; */
`;

export default Paper;
