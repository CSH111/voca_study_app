import { useEffect } from "react";
import { useState } from "react";
import { FormCtxProvider, useFormContext } from "./FormContext";

import * as S from "./styles";

const Form = ({ children, onSubmit, onChange }) => {
  const [values, setValues] = useState({});
  const [validityObj, setValidityObj] = useState({});
  return (
    <FormCtxProvider value={{ values, setValues, validityObj, setValidityObj }}>
      <ValueSender onSubmit={onSubmit} onChange={onChange}>
        {children}
      </ValueSender>
    </FormCtxProvider>
  );
};

const ValueSender = ({ onSubmit, onChange, children }) => {
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
    <form onSubmit={handleSubmit}>{children}</form>

    // <S.Form onSubmit={handleSubmit} onChange={handleChange}>
    //   {children}
    // </S.Form>
  );
};

export { Form };
