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
    // setTimeout(() => {
    const validityArr = Object.values(formCtx.validityObj);
    const formValidity = validityArr.reduce((acc, curr) => acc && curr, true);
    if (onChange) onChange(formValidity);
    // }, 0);
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
