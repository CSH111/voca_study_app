import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100px;
  height: 30px;
  border: solid 1px black;

  div {
    background-color: lightcoral;
    height: inherit;
    /* width: calc(100% * ${(props) => props.progress}); */
    width: calc(100% * ${({ progress }) => (progress ? progress : 0)});
    transition: all 0.5s;
  }
`;

const ProgressBar = ({ progress }) => {
  console.log(progress);
  return (
    <StyledDiv progress={progress}>
      <div className="gage"></div>
    </StyledDiv>
  );
};

export default ProgressBar;
