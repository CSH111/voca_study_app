import { useEffect } from "react";
import { useState } from "react";
import { FormCtxProvider, useFormContext } from "./FormContext";

const Form = ({ children, onSubmit, onChange, className }) => {
  const [values, setValues] = useState({});
  const [validityObj, setValidityObj] = useState({});
  return (
    <FormCtxProvider value={{ values, setValues, validityObj, setValidityObj }}>
      <ValueSender onSubmit={onSubmit} onChange={onChange} className={className}>
        {children}
      </ValueSender>
    </FormCtxProvider>
  );
};

const ValueSender = ({ onSubmit, onChange, children, className }) => {
  const formCtx = useFormContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formCtx.values); //onSubmit 처리 인자로 ctx.values 넘겨줌
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (!onChange) return;
    const keys = Object.keys(formCtx.values);
    const isAllValid = keys.reduce((acc, cur) => acc && formCtx.values[cur]?.validity, true);
    onChange(formCtx.values, isAllValid); //inputchange에서 여기에 메세지담으면 되려나?
  }, [formCtx]);

  //디바운싱 옵션

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};

export default Form;
