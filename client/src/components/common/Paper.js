import styled, { css } from "styled-components";

const Paper = ({
  children,
  className,
  width,
  paperHeader,
  headerMb,
  paperFooter,
  alignSelf,
  bodyAlign,
  flex,
  shadowColor,
  minHeight,
  onClick,
  small,
  height,
  bigPage,
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
      small={small}
      height={height}
      bigPage={bigPage}
      alignSelf={alignSelf}
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
  height: ${(p) => p.height ?? "auto"};
  width: ${(p) => p.width ?? "400px"};
  flex: ${(p) => p.flex ?? "none"};
  box-shadow: 3px 3px 6px 2px ${(p) => p.theme.color.shadow.main ?? "gray"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  align-self: ${(p) => p.alignSelf ?? "auto"};
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
    align-items: center;
  }

  @media (max-width: 600px) {
    padding: 15px;
    ${(p) =>
      p.small &&
      css`
        @media (max-height: 600px) {
          align-self: flex-start;
        }
      `}
    box-shadow: ${(p) => !p.small && "none"};
    width: ${(p) => (p.small ? "95%" : "100%")};
    margin: 0;
    ${(p) =>
      p.bigPage &&
      css`
        align-self: flex-start;
      `}
  }
`;
const Body = styled.div`
  height: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: ${({ bodyAlign }) => bodyAlign ?? "center"};
`;
