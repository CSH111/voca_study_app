const focusIfEmptyRefValue = (elemRef) => {
  if (!elemRef.current.value) {
    elemRef.current.focus();
    return true;
  }
  return false;
};

export default focusIfEmptyRefValue;
