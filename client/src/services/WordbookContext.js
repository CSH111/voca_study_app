import { useState } from "react";
import React from "react";
import { useAuthContext } from "./Auth/hooks/useAuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";

const WordBookCtx = React.createContext(null);

const WordBookProvider = ({ children }) => {
  const [topicsData, setTopicsData] = useState({ topics: [], loading: true });
  const [wordsData, setWordsData] = useState({ words: [], loading: true });
  const { user } = useAuthContext();
  const [isDataInitiated, setIsDataInitiated] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const topicRes = getTopics();
        const wordsRes = getWords();
        await Promise.all([topicRes, wordsRes]);
        setIsDataInitiated(true);
      }
    };
    getData();
  }, [user]);

  const getTopics = async () => {
    axios
      .get("/api/topic") //
      .then((res) => {
        setTopicsData({ topics: res.data.topics, loading: false });
      })
      .catch(console.log);
  };

  const getWords = async () => {
    axios
      .get("/api/word") //
      .then((res) => {
        setWordsData({ words: res.data.words, loading: false });
      })
      .catch(console.log);
  };

  return (
    <WordBookCtx.Provider
      value={{
        topicsData,
        setTopicsData,
        wordsData,
        setWordsData,
        isDataInitiated,
      }}
    >
      {children}
    </WordBookCtx.Provider>
  );
};

const useWordbook = () => useContext(WordBookCtx);

export { WordBookProvider, useWordbook };
