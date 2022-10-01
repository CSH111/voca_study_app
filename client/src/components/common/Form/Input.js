import React from "react";
import { useEffect, useContext } from "react";
import { FormContext } from "./Form";

const Input = React.forwardRef((props, ref) => {
  const formCtx = useContext(FormContext);
  const valueInContext = formCtx.values[props.name] ?? "";

  //value 초기값 생성
  useEffect(() => {
    formCtx.setValues((values) => ({ ...values, [props.name]: "" }));
    return () => {
      formCtx.setValues({});
    };
  }, []);

  const handleChange = (e) => {
    formCtx.setValues((values) => ({
      ...values,
      [props.name]: e.target.value,
    }));
    // 필요하다면 디바운스 적용
  };

  return (
    <div className="control">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        name={props.name}
        className={props.className}
        type={props.type}
        onChange={handleChange}
        value={valueInContext}
        ref={ref}
      />
    </div>
  );
});

export default Input;
