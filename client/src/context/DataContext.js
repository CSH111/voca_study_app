import { useState } from "react";
// const { createContext } = require("react");
import React from "react";

const DataContext = React.createContext(null);

const ContextProvider = ({ children }) => {
  const [topicsData, setTopicsData] = useState({ topics: [], loading: true });
  const [wordsData, setWordsData] = useState({ words: [], loading: true });
  const [wordLoading, setWordLoading] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userName, setUserName] = useState(null);
  const [params, setParams] = useState({});

  return (
    <DataContext.Provider
      value={{
        topicsData,
        setTopicsData,
        wordsData,
        setWordsData,
        wordLoading,
        setWordLoading,
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        params,
        setParams,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { ContextProvider, DataContext };
