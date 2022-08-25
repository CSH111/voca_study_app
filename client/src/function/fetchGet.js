import React from "react";

const fetchGet = () => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {});
};

export default fetchGet;
