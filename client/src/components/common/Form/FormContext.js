import { useContext } from "react";
import { createContext } from "react";

const FormContext = createContext(null);

const useFormContext = () => useContext(FormContext);

const FormCtxProvider = ({ children, value }) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export { useFormContext, FormCtxProvider };
