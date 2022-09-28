import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 80px;
  height: 15px;
  outline: solid 1px black;
  opacity: ${({ innerText }) => (innerText ? 1 : 0)};

  .gage {
    background-color: lightcoral;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    height: 100%;
    /* width: calc(100% * ${(props) => props.progress}); */
    width: calc(100% * ${({ progress }) => (progress ? progress : 0)});
    transition: all 0.5s;
  }
`;

const ProgressBar = ({ progress, innerText }) => {
  return (
    <StyledDiv progress={progress} innerText={innerText}>
      <div className="gage">{innerText}</div>
    </StyledDiv>
  );
};

export default ProgressBar;
