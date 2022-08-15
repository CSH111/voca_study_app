import { useEffect, useState } from "react";

const useFetch = (url, callback) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        callback();
      });
  }, []);

  return data;
};

export default useFetch;
