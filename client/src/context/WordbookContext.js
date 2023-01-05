import { useState } from "react";
import React from "react";
import { useAuthContext } from "./AuthContext";
import { useEffect } from "react";
import { useContext } from "react";
import { wordbookService } from "../services";

const WordBookCtx = React.createContext(null);

export const WordbookProvider = ({ children }) => {
  const [topicsData, setTopicsData] = useState({ topics: [], loading: true });
  const [wordsData, setWordsData] = useState({ words: [], loading: true });
  const { user } = useAuthContext();
  const [isDataInitiated, setIsDataInitiated] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (user) {
        await Promise.all([getTopics(), getWords()]);
        setIsDataInitiated(true);
      }
    };
    getData();
  }, [user]);

  const getTopics = async () => {
    try {
      const res = await wordbookService.getTopics();
      setTopicsData({ topics: res.data.topics, loading: false });
    } catch (err) {
      console.log(err);
    }
  };

  const getWords = async () => {
    try {
      const res = await wordbookService.getWords();
      setWordsData({ words: res.data.words, loading: false });
    } catch (err) {
      console.log(err);
    }
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

export const useWordbookContext = () => useContext(WordBookCtx);