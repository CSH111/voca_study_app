import styled, { css } from "styled-components";

const Paper = ({
  children,
  width,
  className,
  paperHeader,
  headerMb,
  paperFooter,
  bodyAlign,
  flex,
  shadowColor,
  onClick,
  minHeight,
  isModal,
}) => {
  return (
    <StyledDiv
      onClick={onClick}
      width={width}
      className={className}
      flex={flex}
      shadowColor={shadowColor}
      minHeight={minHeight}
      headerMb={headerMb}
      isModal={isModal}
    >
      {paperHeader && <div className="paper-header">{paperHeader}</div>}
      <Body bodyAlign={bodyAlign}>{children}</Body>
      {paperFooter && <div className="paper-footer">{paperFooter}</div>}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background-color: white;
  margin-bottom: 10%;
  margin-top: 10%;
  min-height: ${(p) => p.minHeight ?? "400px"};
  width: ${(p) => p.width ?? "400px"};
  flex: ${(p) => p.flex ?? "none"};

  /* min-width: ${(p) => p.minWidth ?? "400px"}; */
  /* width: 400px; */
  /* max-width: ${(p) => p.maxWidth ?? "400px"}; */
  box-shadow: 3px 3px 6px 2px ${({ shadowColor }) => shadowColor ?? "gray"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  .paper-header {
    margin-bottom: ${(p) => p.headerMb ?? "20px"};
  }
  .paper-footer {
    align-self: center;
    min-height: 50px;
    display: flex;
    align-items: center;
  }

  @media (max-width: 800px) {
    box-shadow: ${(p) => !p.isModal && "none"};
    width: ${(p) => (p.isModal ? "90%" : "100%")};
    margin: 0;
  }
`;
const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${({ bodyAlign }) => bodyAlign ?? "center"};
  /* align-items: stretch; */
`;

export default Paper;
