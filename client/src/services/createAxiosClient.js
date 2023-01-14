import axios from "axios";

export const createAxiosClient = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 2000,
  });

  return instance;
};
