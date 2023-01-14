import { useContext, useReducer } from "react";
import { createContext } from "react";

import { wordbookActionType as WAT } from "../constants";

const WordbookCtx = createContext(null);
const WordbookDispatchCtx = createContext(null);

const initialState = {
  topics: [],
  words: [],
  isLoading: true,
  isError: false,
};

const wordbookReducer = (state, { type, payload }) => {
  switch (type) {
    case WAT.GET_WORDBOOK_PENDING:
      return { ...state, isLoading: true, isError: false };
    case WAT.GET_WORDBOOK_FULFILLED:
      return {
        ...state,
        ...payload,
        isLoading: false,
        isError: false,
      };
    case WAT.GET_WORDBOOK_REJECTED:
      return { ...state, isLoading: false, isError: true };
    case WAT.POST_TOPIC_FULFILLED:
      return { ...state, topics: payload };
    case WAT.DELETE_TOPIC_FULFILLED:
      return { ...state, ...payload };
    case WAT.PATCH_TOPIC_FULFILLED:
      return { ...state, ...payload };
    case WAT.POST_WORD_FULFILLED:
      return { ...state, words: payload };
    case WAT.DELETE_WORD_FULFILLED:
      return { ...state, ...payload };
    case WAT.PATCH_WORD_FULFILLED:
      return { ...state, ...payload };
    case WAT.CLEAR_WORDBOOK:
      return { ...initialState };

    default:
      return state;
  }
};

export const WordbookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wordbookReducer, initialState);
  return (
    <WordbookCtx.Provider value={state}>
      <WordbookDispatchCtx.Provider value={dispatch}>{children}</WordbookDispatchCtx.Provider>
    </WordbookCtx.Provider>
  );
};

export const useWordbookSelector = () => useContext(WordbookCtx);
export const useWordbookDispatch = () => useContext(WordbookDispatchCtx);
