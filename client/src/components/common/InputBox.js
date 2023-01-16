import { forwardRef } from "react";

import UnderLinedInput from "./UnderLinedInput";

const InputBox = forwardRef(({ onClick, ...rest }, ref) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick && onClick(e);
  };
  return <UnderLinedInput {...rest} onClick={handleClick} ref={ref} />;
});

InputBox.displayName = "InputBox";

export default InputBox;
