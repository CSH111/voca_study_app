import { useState } from "react";
import styled from "styled-components";

import { EllipsisIcon } from "../common/icons";
import Button from "./Button";

const StyledDiv = styled.div`
  position: relative;
  margin: 0.35rem 0.2rem;
  width: auto;
  height: auto;

  .ellipsisBtn {
    position: relative;
    z-index: 2;
  }
  button {
    min-width: 35px;
    height: 35px;
  }
  .items {
    z-index: 1;
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 0;
    right: 0;
    overflow: hidden;
    transition: all 0.2s;
    transition-timing-function: ease-in;

    ${({ menuOn }) =>
      menuOn //
        ? `
        pointer-events:auto;
        right:2.5rem;
        opacity:1;
        
        `
        : `
        pointer-events:none;
        opacity:0;
        `}
  }
`;
const Ellipsis = ({ items, disabled }) => {
  const [menuOn, setMenuOn] = useState(false);
  const handleClick = (e) => {
    // e.stopPropagation();
    setMenuOn(!menuOn);
  };

  return (
    <StyledDiv menuOn={menuOn} className="ellipsis">
      <Button className="ellipsisBtn" disabled={disabled} onClick={handleClick}>
        <EllipsisIcon />
      </Button>

      <div className="items">{items}</div>
    </StyledDiv>
  );
};

export default Ellipsis;
