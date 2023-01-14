import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { EllipsisIcon } from "../icons";
import { Button } from "./";

const Ellipsis = ({ items, disabled }) => {
  const [menuOn, setMenuOn] = useState(false);
  const btnsBoxRef = useRef();

  const handleEllipsisClick = () => {
    setMenuOn(!menuOn);
  };

  const handleBtnItemClick = () => {
    setMenuOn(false);
  };

  useEffect(() => {
    btnsBoxRef.current?.childNodes.forEach((btn) => {
      btn.addEventListener("click", handleBtnItemClick);
    });
  }, [btnsBoxRef]);

  return (
    <StyledDiv menuOn={menuOn} className="ellipsis">
      <Button className="ellipsisBtn" disabled={disabled} onClick={handleEllipsisClick} angleBorder>
        <EllipsisIcon />
      </Button>

      <div className="items" ref={btnsBoxRef}>
        {items}
      </div>
    </StyledDiv>
  );
};

export default Ellipsis;

const StyledDiv = styled.div`
  position: relative;
  width: auto;
  height: auto;
  align-self: flex-start;
  .ellipsisBtn {
    position: relative;
    z-index: 2;
  }
  button {
    flex-shrink: 0;
    width: 40px;
    height: 35px;
  }
  ${(p) =>
    p.menuOn &&
    css`
      button {
        background-color: ${(p) => p.theme.color.gray.light};
      }
    `}

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
        ? css`
            pointer-events: auto;
            right: 40px;
            opacity: 1;
          `
        : css`
            pointer-events: none;
            opacity: 0;
          `}
  }
`;
