import { useEffect, useState } from "react";

import { FormCtxProvider } from "./FormContext";

const Form = ({ children, onSubmit, onChange, className }) => {
  const [inputStates, setInputStates] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputStates);
  };

  useEffect(() => {
    if (!onChange) return;
    const keys = Object.keys(inputStates);
    const isAllValid = keys.reduce((acc, cur) => acc && inputStates[cur]?.validity, true);
    onChange(inputStates, isAllValid);
  }, [inputStates, setInputStates]);

  return (
    <FormCtxProvider value={setInputStates}>
      <form className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormCtxProvider>
  );
};

export default Form;
