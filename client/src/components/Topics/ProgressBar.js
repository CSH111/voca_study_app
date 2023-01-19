import styled from "styled-components";

const ProgressBar = ({ progress, innerText, show }) => {
  return (
    <StyledEmptyBar progress={progress} innerText={innerText} show={show}>
      <div className="gage"></div>
    </StyledEmptyBar>
  );
};

export default ProgressBar;

const StyledEmptyBar = styled.div`
  width: ${(p) => (p.show ? "60px" : "0")};
  height: 10px;
  outline: solid 1px ${(p) => p.theme.color.primary.main};
  border: solid 1px ${(p) => p.theme.color.secondary.main};
  opacity: ${(p) => (p.show ? "1" : "0")};
  .gage {
    background-color: ${(p) => p.theme.color.primary.main};
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    height: 100%;
    width: calc(100% * ${({ progress }) => (progress ? progress : 0)});
    transition: all 0.5s;
  }
`;
