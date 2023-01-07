import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { MODAL_FADE_TIME } from "../constants";

const ModalContext = createContext(null);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (ModalComponent) => {
    setIsOpen(true);
    setModal(ModalComponent);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setModal(null);
    }, MODAL_FADE_TIME);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, setIsOpen }}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
};