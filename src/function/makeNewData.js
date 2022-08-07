const makeNewData = (dataArr, data, newData) => {
  const updatedWords = dataArr.map((item) => {
    if (item.id === data.id) {
      return { ...item, ...newData };
    }
    return item;
  });

  return updatedWords;
};

export default makeNewData;
