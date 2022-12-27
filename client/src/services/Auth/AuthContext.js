import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "./hooks/useAuthContext";

const AuthContext = React.createContext(null);
// const ctx = useAuthContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/user`) //
      .then((res) => {
        setUser(res.data.userName);
        setIsLoading(false);
      })
      .catch(console.log);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
