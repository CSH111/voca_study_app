import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { MODAL_FADE_TIME } from "../constants";

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [onClose, setOnClose] = useState(null);

  const openModal = (ModalComponent) => {
    setIsOpen(true);
    setModal(ModalComponent);
  };

  const closeModal = () => {
    if (onClose) onClose();
    setOnClose(null);
    setIsOpen(false);
    setTimeout(() => {
      setModal(null);
    }, MODAL_FADE_TIME);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, setIsOpen, setOnClose }}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
};
