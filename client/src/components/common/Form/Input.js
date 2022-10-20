import { useState } from "react";
import { forwardRef, useEffect } from "react";
import { useFormContext } from "./FormContext";

const Input = forwardRef((props, ref) => {
  const formCtx = useFormContext();
  const valueInContext = formCtx.values[props.name] ?? "";
  const [isValid, setIsValid] = useState(!props.required);
  const { onChange, errorMsg, ...restProps } = props;

  //value 초기값 생성
  useEffect(() => {
    formCtx.setValues((values) => ({ ...values, [props.name]: "" }));

    formCtx.setValidityObj((obj) => ({ ...obj, [props.name]: isValid }));

    return () => formCtx.setValues({});
  }, []);

  const handleChange = (e) => {
    formCtx.setValues((values) => ({
      ...values,
      [props.name]: e.target.value,
    }));
    setIsValid(e.target.validity.valid);

    formCtx.setValidityObj((obj) => ({
      ...obj,
      [props.name]: e.target.validity.valid,
    }));

    if (onChange) onChange(e.target.value);

    // 필요하다면 디바운스 적용 input prop 으로 적용여부 선택 할 수 있도록 ㄱㄱ
  };

  return (
    <div className="control">
      <input
        {...restProps}
        onChange={handleChange}
        value={valueInContext}
        ref={ref}
      />
      {!isValid && valueInContext && <div className="errorMsg">{errorMsg}</div>}
    </div>
  );
});

export default Input;
