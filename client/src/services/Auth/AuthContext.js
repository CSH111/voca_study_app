import React, { useState } from "react";
import { useContext } from "react";

const AuthContext = React.createContext(null);

const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userName, setUserName] = useState(null);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext };
