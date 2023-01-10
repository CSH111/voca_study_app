import { useEffect } from "react";
import styled, { css } from "styled-components";

import { MODAL_FADE_TIME } from "../../../constants";
import { useModal } from "../../../context";
import Button from "../Button";
import { CancelIcon, Spinner } from "../icons";
import Paper from "../Paper";

const Modal = ({ children, footer, isLoading, title, onClose }) => {
  const { closeModal, isOpen, setOnClose } = useModal();

  useEffect(() => {
    if (!onClose) return;
    setOnClose(() => onClose);
  }, [onClose]);

  const handleBgClick = (e) => {
    e.stopPropagation();
    closeModal();
  };
  const handlePaperClick = (e) => {
    e.stopPropagation();
  };
  const handleCloseBtnClick = () => {
    closeModal();
  };
  const fadeSec = MODAL_FADE_TIME * 0.001;
  return (
    <StyledBg onClick={handleBgClick} isOpen={isOpen} fadeSec={fadeSec}>
      <StyledPaper
        shadowColor="#161616ff"
        minHeight="200px"
        onClick={handlePaperClick}
        paperHeader={
          <ModalHeader>
            <HeaderMsg>{title}</HeaderMsg>
            <Button onClick={handleCloseBtnClick}>
              <CancelIcon fontSize="25px" />
            </Button>
          </ModalHeader>
        }
        paperFooter={footer}
        isModal
      >
        {children}
        {isLoading && (
          <StyledLoadingCover fadeSec={fadeSec}>
            <Spinner fontSize="35px" color="#000000" />
          </StyledLoadingCover>
        )}
      </StyledPaper>
    </StyledBg>
  );
};

export default Modal;

const ModalHeader = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderMsg = styled.h4`
  font-size: 20px;
  font-weight: bold;
`;

const StyledPaper = styled(Paper)`
  position: relative;
`;

const StyledBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  background-color: #000000b6;
  animation: fade-in ${(p) => p.fadeSec}s linear forwards;
  ${(p) =>
    !p.isOpen &&
    css`
      animation: fade-out ${(p) => p.fadeSec}s linear forwards;
    `}

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const StyledLoadingCover = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000000b6;
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    filter: drop-shadow(0px 0px 5px #e3e3e3);
  }
  animation: fade-in ${(p) => p.fadeSec}s linear forwards;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
