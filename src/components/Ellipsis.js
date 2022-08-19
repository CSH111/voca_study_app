import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useState } from "react";
const StyledDiv = styled.div`
  position: relative;
  .ellipsisBtn {
    position: relative;
    z-index: 2;
  }
  div {
    z-index: 1;
    position: absolute;
    display: flex;
    flex-direction: row;
    top: 0;
    right: -3rem;
    transition: all 0.2s;

    ${({ menuOn }) =>
      menuOn //
        ? `pointer-events:auto;
        right:2.5rem;

        opacity:1;
        
        `
        : `pointer-events:none;
        opacity:0;
        `}
  }
`;

const Ellipsis = ({ items }) => {
  const [menuOn, setMenuOn] = useState(false);
  return (
    <StyledDiv menuOn={menuOn}>
      <Button className="ellipsisBtn" onClick={() => setMenuOn(!menuOn)}>
        <FontAwesomeIcon icon={faEllipsis} />
      </Button>

      <div className="items">{items}</div>
    </StyledDiv>
  );
};

export default Ellipsis;
