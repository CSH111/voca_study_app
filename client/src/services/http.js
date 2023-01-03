import axios from "axios";

export const createAxiosClient = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
    timeout: 1000,
  });
};
