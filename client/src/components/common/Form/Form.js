import React from "react";
import { useState, useContext } from "react";

const FormContext = React.createContext(null);

const Form = ({ children, onSubmit }) => {
  const [values, setValues] = useState({});

  return (
    <FormContext.Provider value={{ values, setValues }}>
      <ValueSender onSubmit={onSubmit}>{children}</ValueSender>
    </FormContext.Provider>
  );
};

const ValueSender = ({ onSubmit, children }) => {
  const formCtx = useContext(FormContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formCtx); //onSubmit 처리 인자로 context 넘겨줌
  };
  return <form onSubmit={handleSubmit}>{children}</form>;
};

export { Form, FormContext };
