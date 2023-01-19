import { createContext, useContext, useState } from "react";

import { MODAL_FADE_TIME } from "../constants";

const ModalContext = createContext(null);
const ModalStateContext = createContext(null);

export const useModal = () => useContext(ModalContext);
export const useModalState = () => useContext(ModalStateContext);

export const ModalProvider = ({ children }) => {
  const [modalComponent, setModalComponent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [onClose, setOnClose] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const openModal = (ModalComponent) => {
    setIsOpen(true);
    setModalComponent(ModalComponent);
  };

  const closeModal = () => {
    if (onClose) onClose();
    setOnClose(null);
    setIsOpen(false);
    setTimeout(() => {
      setModalComponent(null);
      setIsModalLoading(false);
    }, MODAL_FADE_TIME);
  };

  const runOnModalClose = (fn) => {
    setOnClose(() => fn);
  };

  const activateModalLoading = () => {
    setIsModalLoading(true);
  };

  const deactivateModalLoading = () => {
    setIsModalLoading(false);
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        activateModalLoading,
        runOnModalClose,
        deactivateModalLoading,
      }}
    >
      <ModalStateContext.Provider value={{ isOpen, isModalLoading }}>
        {children}
        {modalComponent}
      </ModalStateContext.Provider>
    </ModalContext.Provider>
  );
};
