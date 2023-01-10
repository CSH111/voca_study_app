import { createContext, useContext } from "react";

const SetFormCtx = createContext(null);

const useSetForm = () => useContext(SetFormCtx);

const FormCtxProvider = ({ children, value }) => {
  return <SetFormCtx.Provider value={value}>{children}</SetFormCtx.Provider>;
};

export { FormCtxProvider, useSetForm };
