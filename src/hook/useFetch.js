import { useEffect, useState } from "react";

const useFetch = (url, setState) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setState(false);
      });
  }, []);

  return data;
};

export default useFetch;
