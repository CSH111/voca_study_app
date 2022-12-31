import styled, { css } from "styled-components";
import Paper from "../Paper";
import { useEffect, useState } from "react";
import { CancelIcon, Spinner } from "../icons";
import Button from "../Button";
import ModalPortal from "../ModalPortal";

const Modal = ({ children, isOpen, setIsOpen, footer, isLoading }) => {
  const handleBgClick = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };
  const handlePaperClick = (e) => {
    e.stopPropagation();
  };
  const handleCloseBtnClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen === true) {
      setRenderTreeState(true);
      return;
    }
    setTimeout(() => {
      setRenderTreeState(false);
    }, 150);
  }, [isOpen]);

  const [renderTreeState, setRenderTreeState] = useState(false);
  return (
    <ModalPortal>
      {renderTreeState && (
        <StyledBg onClick={handleBgClick} state={isOpen}>
          <StyledPaper
            shadowColor="#161616ff"
            minHeight="200px"
            onClick={handlePaperClick}
            paperHeader={
              <StyledButton onClick={handleCloseBtnClick}>
                <CancelIcon fontSize="25px" />
              </StyledButton>
            }
            paperFooter={footer}
            isModal
          >
            {children}
            {isLoading && (
              <StyledLoadingCover>
                <Spinner fontSize="35px" color="#000000" />
              </StyledLoadingCover>
            )}
          </StyledPaper>
        </StyledBg>
      )}
    </ModalPortal>
  );
};

export default Modal;

const StyledButton = styled(Button)`
  float: right;
`;

const StyledPaper = styled(Paper)`
  position: relative;
`;

const StyledBg = styled.div`
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
  animation: fade-in 0.15s linear forwards;
  ${(p) =>
    !p.state &&
    css`
      animation: fade-out 0.15s linear forwards;
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
  animation: fade-in 0.15s linear forwards;

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
