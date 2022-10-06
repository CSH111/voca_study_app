import { useState } from "react";
import React from "react";

const DataContext = React.createContext(null);

const ContextProvider = ({ children }) => {
  const [topicsData, setTopicsData] = useState({ topics: [], loading: true });
  const [wordsData, setWordsData] = useState({ words: [], loading: true });

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
