import styled from "styled-components";
import Paper from "../Paper";
import { useState } from "react";
import { CancelIcon } from "../icons";
import Button from "../Button";

const Modal = ({ children, state, setState, footer }) => {
  const handleBgClick = () => {
    setState(false);
  };
  const handlePaperClick = (e) => {
    e.stopPropagation();
  };
  const handleModalClose = () => {
    setState(false);
  };
  return (
    <StyledBg onClick={handleBgClick}>
      <StyledPaper
        shadowColor="#161616ff"
        minHeight="200px"
        onClick={handlePaperClick}
        paperHeader={
          <StyledButton onClick={handleModalClose}>
            <CancelIcon fontSize="25px" />
          </StyledButton>
        }
        paperFooter={footer}
      >
        {children}
      </StyledPaper>
    </StyledBg>
  );
};

export default Modal;

const StyledButton = styled(Button)`
  float: right;
`;

const StyledPaper = styled(Paper)``;

const StyledBg = styled.div`
  /* display: ${({ open }) => (open ? "flex" : "none")}; */
  /* opacity: ${({ open }) => (open ? "1" : "0")};
  transition: opacity 0.5s; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: #000000b6;
`;

// export { ModalContainer, ModalBg };
