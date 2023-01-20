import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { useSetForm } from "./FormContext";

const Input = forwardRef((props, ref) => {
  const { errorMsg, ...restProps } = props;
  const { name, pattern } = props;

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
        value: inputValue,
        validity: inputElem.current?.validity.valid,
        validityMsg: errorMsg,
      },
    }));
  }, [inputValue, pattern]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return <input {...restProps} value={inputValue} onChange={handleChange} ref={inputElem} />;
});

Input.displayName = "Input";

export default Input;
