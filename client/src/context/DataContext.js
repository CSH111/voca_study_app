import { useState } from "react";
// const { createContext } = require("react");
import React from "react";

const DataContext = React.createContext(null);

const ContextProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [words, setWords] = useState([]);
  const [wordLoading, setWordLoading] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userName, setUserName] = useState(null);
  const [params, setParams] = useState({});

  return (
    <DataContext.Provider
      value={{
        topics,
        setTopics,
        words,
        setWords,
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
