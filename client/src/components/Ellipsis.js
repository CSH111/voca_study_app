import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "./Button";
import { useState } from "react";

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
    background-color: #f5f5f6;
    width: 2.5rem;
  }
  div {
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

const Ellipsis = ({ items }) => {
  const [menuOn, setMenuOn] = useState(false);
  return (
    <StyledDiv menuOn={menuOn} className="ellipsis">
      <Button className="ellipsisBtn" onClick={() => setMenuOn(!menuOn)}>
        <FontAwesomeIcon icon={["fas", "ellipsis"]} />
      </Button>

      <div className="items">{items}</div>
    </StyledDiv>
  );
};

export default Ellipsis;
