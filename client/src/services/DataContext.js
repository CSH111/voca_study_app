import { useState } from "react";
import React from "react";

const DataContext = React.createContext(null);

const ContextProvider = ({ children }) => {
  const [topicsData, setTopicsData] = useState({ topics: [], loading: true });
  const [wordsData, setWordsData] = useState({ words: [], loading: true });
  const [params, setParams] = useState({});

  return (
    <DataContext.Provider
      value={{
        topicsData,
        setTopicsData,
        wordsData,
        setWordsData,
        params,
        setParams,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { ContextProvider, DataContext };
