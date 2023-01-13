import styled, { css } from "styled-components";

const Paper = ({
  children,
  className,
  width,
  paperHeader,
  headerMb,
  paperFooter,
  bodyAlign,
  flex,
  shadowColor,
  minHeight,
  onClick,
  isModal,
  height,
  forPage,
}) => {
  return (
    <Box
      onClick={onClick}
      width={width}
      className={className + " paper-component"}
      flex={flex}
      shadowColor={shadowColor}
      minHeight={minHeight}
      headerMb={headerMb}
      isModal={isModal}
      height={height}
      forPage={forPage}
    >
      {paperHeader && <div className="paper-header">{paperHeader}</div>}
      <Body bodyAlign={bodyAlign}>{children}</Body>
      {paperFooter && <div className="paper-footer">{paperFooter}</div>}
    </Box>
  );
};

export default Paper;

const Box = styled.div`
  background-color: ${(p) => p.theme.color.secondary.main};
  min-height: ${(p) => p.minHeight ?? "400px"};
  height: ${(p) => p.height ?? "0"};
  width: ${(p) => p.width ?? "400px"};
  flex: ${(p) => p.flex ?? "none"};
  box-shadow: 3px 3px 6px 2px ${(p) => p.theme.color.shadow.main ?? "gray"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;

  .paper-header {
    align-self: stretch;
    display: flex;
    align-items: center;
    margin-bottom: ${(p) => p.headerMb ?? "20px"};
    > h3 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    > *:not(:last-child) {
      margin-right: 5px;
    }
  }
  .paper-footer {
    align-self: center;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 50px;
    align-items: center;
  }

  @media (max-width: 700px) {
    box-shadow: ${(p) => !p.isModal && "none"};
    width: ${(p) => (p.isModal ? "90%" : "100%")};
    margin: 0;
    ${(p) =>
      p.forPage &&
      css`
        align-self: flex-start;
      `}
  }
`;
const Body = styled.div`
  height: 80%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: ${({ bodyAlign }) => bodyAlign ?? "center"};
`;

//TODO 모바일화면 작은 페이퍼 경계표시
