import { useRef, useState } from "react";
import { useEffect } from "react";

import { useSetForm } from "./FormContext";

const Select = ({ children, name, defaultValue, className }) => {
  const setForm = useSetForm();
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const selectRef = useRef();

  useEffect(() => {
    setForm((states) => ({
      ...states,
      [name]: {
        value: selectedValue,
        validity: true,
      },
    }));
  }, [selectedValue]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <select onChange={handleChange} value={selectedValue} ref={selectRef} className={className}>
      {children}
    </select>
  );
};

export default Select;
