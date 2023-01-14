import { useEffect } from "react";

import { ErrorModal } from "../components/common";
import { useModal } from "../context";
import createAuthService from "./createAuthService";
import { createAxiosClient } from "./createAxiosClient";
import createWordbookService from "./createWordbookService";

const BASE_URL = "http://localhost:3000";

const httpForAuth = createAxiosClient(BASE_URL);
const httpForWordbook = createAxiosClient(BASE_URL);

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
