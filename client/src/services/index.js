import { useEffect } from "react";

import { ErrorModal } from "../components/common";
import { LOCAL_TEST_SERVER_URL, SERVER_URL } from "../constants";
import { useModal } from "../context";
import createAuthService from "./createAuthService";
import { createAxiosClient } from "./createAxiosClient";
import createWordbookService from "./createWordbookService";

const url = process.env.NODE_ENV === "development" ? LOCAL_TEST_SERVER_URL : SERVER_URL;

const httpForAuth = createAxiosClient(url);
const httpForWordbook = createAxiosClient(url);

export const authService = createAuthService(httpForAuth);
export const wordbookService = createWordbookService(httpForWordbook);
export const useAxiosInterseptors = () => {
  const { openModal } = useModal();

  useEffect(() => {
    httpForWordbook.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        openModal(<ErrorModal />);
        return Promise.reject(err);
      }
    );
  }, []);
};
