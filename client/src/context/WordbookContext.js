import { useEffect, useContext, useReducer } from "react";
import { useAuthSeletor } from "./AuthContext";
import { wordbookService } from "../services";
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
  console.log(state);
  switch (type) {
    case WAT.GET_WORDBOOK_PENDING:
      return { ...state, isLoading: true, isError: false };
    case WAT.GET_WORDBOOK_FULFILLED:
      return {
        ...state,
        topics: payload.topics,
        words: payload.words,
        isLoading: false,
        isError: false,
      };
    case WAT.GET_WORDBOOK_REJECTED:
      return { ...state, isLoading: false, isError: true };
    //

    case WAT.POST_TOPIC_FULFILLED:
      return { ...state, topics: payload };
    //
    case WAT.DELETE_TOPIC_FULFILLED: {
      const { topics, words } = state;
      const newTopics = topics.filter(({ _id }) => _id !== payload);
      const newWords = words.filter(({ topicID }) => topicID !== payload);

      return { ...state, topics: newTopics, words: newWords };
    }
    //
    case WAT.PATCH_TOPIC_FULFILLED: {
      const { topics, words } = state;
      const newTopics = topics.map((topic) => {
        if (topic._id === payload.topicID) {
          return { ...topic, topicName: payload.topicName };
        }
        return topic;
      });
      const newWords = words.map((word) => {
        if (word.topicID === payload.topicID) {
          return { ...word, topic: payload.topicName };
        }
        return word;
      });
      console.log("new", newTopics);
      return { ...state, topics: newTopics, words: newWords };
    }

    default:
      return state;
  }
};

export const WordbookProvider = ({ children }) => {
  const { user } = useAuthSeletor();
  const [state, dispatch] = useReducer(wordbookReducer, initialState);

  // TODO: 전역에서 전역으로 접근하는게 매우 별로다. 실수유발 쉬움
  useEffect(() => {
    const getData = async () => {
      if (!user) return;
      dispatch({ type: WAT.GET_WORDBOOK_PENDING });
      const { getTopics, getWords } = wordbookService;

      try {
        const [topicsRes, wordsRes] = await Promise.all([getTopics(), getWords()]);
        const [topics, words] = [topicsRes.data.topics, wordsRes.data.words];
        dispatch({ type: WAT.GET_WORDBOOK_FULFILLED, payload: { topics, words } });
      } catch (err) {
        dispatch({ type: WAT.GET_WORDBOOK_REJECTED });
      }
    };
    getData();
  }, [user]);

  return (
    <WordbookCtx.Provider value={state}>
      <WordbookDispatchCtx.Provider value={dispatch}>{children}</WordbookDispatchCtx.Provider>
    </WordbookCtx.Provider>
  );
};

export const useWordbookSelector = () => useContext(WordbookCtx);
export const useWordbookDispatch = () => useContext(WordbookDispatchCtx);
