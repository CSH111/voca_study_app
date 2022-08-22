import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100px;
  height: 20px;
  border: solid 1px black;
  display: ${({ innerText }) => (innerText ? `block` : `none`)};

  .gage {
    background-color: lightcoral;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    height: inherit;
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
