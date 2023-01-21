import axios from "axios";

export const createAxiosClient = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    withCredentials: true,
  });

  return instance;
};
