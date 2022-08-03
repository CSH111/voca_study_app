import { useEffect, useState } from "react";

const useFetch = (url, dependency, setState) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .then(() => setState(false));
  }, [dependency]);

  return data;
};

export default useFetch;
