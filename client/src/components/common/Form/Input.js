import { useState } from "react";
import { forwardRef, useEffect } from "react";
import { useFormContext } from "./FormContext";

const Input = forwardRef((props, ref) => {
  const formCtx = useFormContext();
  const valueInContext = formCtx.values[props.name]?.value ?? "";
  const { className, onChange, errorMsg, id, name, type, required, autoFocus, pattern } = props;

  //value 초기값 생성
  useEffect(() => {
    formCtx.setValues((values) => ({
      ...values,
      [props.name]: {
        value: "",
        validity: !props.required,
        validityMsg: errorMsg,
      },
    }));

    return () => formCtx.setValues({});
  }, []);

  const handleChange = (e) => {
    formCtx.setValues((values) => ({
      ...values,
      [props.name]: {
        value: e.target.value,
        validity: e.target.validity.valid,
        validityMsg: errorMsg,
      },
    }));

    formCtx.setValidityObj((obj) => ({
      ...obj,
      [props.name]: e.target.validity.valid,
    }));

    if (onChange) onChange(e.target.value);

    // 필요하다면 디바운스 적용 input prop 으로 적용여부 선택 할 수 있도록 ㄱㄱ
  };

  return (
    <input
      id={id}
      name={name}
      type={type}
      className={className}
      required={required}
      autoFocus={autoFocus}
      onChange={handleChange}
      value={valueInContext}
      pattern={pattern}
      ref={ref}
    />
  );
});

export default Input;
