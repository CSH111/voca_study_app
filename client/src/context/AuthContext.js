import { createContext, useContext } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { authActionType as AT } from "../constants";
import { authService } from "../services";

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

export const useAuthSeletor = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

const initialState = {
  user: "",
  isLoading: true,
  isError: false,
  error: {},
};

const authReducer = (state, { type, payload }) => {
  switch (true) {
    case [AT.GET_USER_PENDING, AT.LOGIN_PENDING, AT.LOGOUT_PENDING, AT.REGISTER_PENDING].includes(
      type
    ):
      return { ...state, isLoading: true, isError: false, error: {} };
    case [
      AT.GET_USER_FULFILLED,
      AT.LOGIN_FULFILLED,
      AT.LOGOUT_FULFILLED,
      AT.REGISTER_FULFILLED,
    ].includes(type):
      return { ...state, isLoading: false, isError: false, user: payload, error: {} };
    case [
      AT.GET_USER_REJECTED,
      AT.LOGIN_REJECTED,
      AT.LOGOUT_REJECTED,
      AT.REGISTER_REJECTED,
    ].includes(type):
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload ? { errName: payload.errName, msg: payload.msg } : {},
      };
    case AT.CLEAR_AUTH_ERROR === type:
      return { ...state, isError: false, error: {} };
    default:
      return { ...state };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  //TODO: App.js 로 위치수정, App 의 라우터는 분리 , index에서 컨텍스트적용

  useEffect(() => {
    dispatch({ type: AT.GET_USER_PENDING });
    authService
      .getUser()
      .then((res) => {
        dispatch({ type: AT.GET_USER_FULFILLED, payload: res.data.userName });
      })
      .catch((err) => {
        dispatch({ type: AT.GET_USER_REJECTED });
      });
  }, []);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
