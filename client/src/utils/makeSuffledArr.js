const makeSuffledArr = (arr) => {
  const copiedArr = [...arr];
  const suffledArr = copiedArr.sort(() => Math.random() - 0.5);
  return suffledArr;
};

export default makeSuffledArr;
