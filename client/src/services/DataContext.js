import { useState } from "react";
import React from "react";
import { useAuthContext } from "./Auth/hooks/useAuthContext";
import { useEffect } from "react";
import axios from "axios";
//TODO useWords 훅으로 빼기
const DataContext = React.createContext(null);

const ContextProvider = ({ children }) => {
  const [topicsData, setTopicsData] = useState({ topics: [], loading: true });
  const [wordsData, setWordsData] = useState({ words: [], loading: true });
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      getTopics();
      getWords();
    }
  }, [user]);

  const getTopics = () => {
    axios
      .get("/api/topic") //
      .then((res) => {
        setTopicsData({ topics: res.data.topics, loading: false });
      })
      .catch(console.log);
  };

  const getWords = () => {
    axios
      .get("/api/word") //
      .then((res) => {
        setWordsData({ words: res.data.words, loading: false });
      })
      .catch(console.log);
  };

  return (
    <DataContext.Provider
      value={{
        topicsData,
        setTopicsData,
        wordsData,
        setWordsData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { ContextProvider, DataContext };
