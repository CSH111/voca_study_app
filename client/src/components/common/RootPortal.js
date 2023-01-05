import { createPortal } from "react-dom";

const RootPortal = ({ children }) => {
  return createPortal(children, document.body);
};

export default RootPortal;
