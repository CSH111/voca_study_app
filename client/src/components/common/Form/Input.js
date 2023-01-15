import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { useSetForm } from "./FormContext";

const Input = forwardRef((props, ref) => {
  const { errorMsg, onChange, ...restProps } = props;
  const { name, required, pattern } = props;

  const setForm = useSetForm();
  const [inputValue, setInputValue] = useState("");
  const inputElem = useRef();

  useImperativeHandle(ref, () => {
    return {
      focus: () => inputElem.current.focus(),
      value: inputElem.current.value,
    };
  });
  useEffect(() => {
    setForm((values) => ({
      ...values,
      [name]: {
        value: "",
        validity: !required,
        validityMsg: errorMsg,
      },
    }));

    return () => setForm({});
  }, []);
  // TODO합치기 , select컴포넌트만들기
  useEffect(() => {
    setForm((values) => ({
      ...values,
      [name]: {
        value: inputValue,
        validity: inputElem.current?.validity.valid,
        validityMsg: errorMsg,
      },
    }));
  }, [inputValue, pattern]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    //TODO 필요하다면 디바운스 적용 input prop 으로 적용여부 선택 할 수 있도록 ㄱㄱ
  };

  return <input {...restProps} value={inputValue} onChange={handleChange} ref={inputElem} />;
});

Input.displayName = "Input";

export default Input;
