import { createContext, useContext } from "react";
import { useReducer } from "react";
import { authActionType as AAT } from "../constants";

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

const initialState = {
  user: "",
  isLoading: true,
  isError: false,
  error: {},
};

const authReducer = (state, { type, payload }) => {
  switch (true) {
    case [
      AAT.GET_USER_PENDING,
      AAT.LOGIN_PENDING,
      AAT.LOGOUT_PENDING,
      AAT.REGISTER_PENDING,
    ].includes(type):
      return { ...state, isLoading: true, isError: false, error: {} };
    case [
      AAT.GET_USER_FULFILLED,
      AAT.LOGIN_FULFILLED,
      AAT.LOGOUT_FULFILLED,
      AAT.REGISTER_FULFILLED,
    ].includes(type):
      return { ...state, isLoading: false, isError: false, user: payload, error: {} };
    case [
      AAT.GET_USER_REJECTED,
      AAT.LOGIN_REJECTED,
      AAT.LOGOUT_REJECTED,
      AAT.REGISTER_REJECTED,
    ].includes(type):
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: payload ? { errName: payload.errName, msg: payload.msg } : {},
      };
    case AAT.CLEAR_AUTH_ERROR === type:
      return { ...state, isError: false, error: {} };
    default:
      return { ...state };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuthSeletor = () => useContext(AuthContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
