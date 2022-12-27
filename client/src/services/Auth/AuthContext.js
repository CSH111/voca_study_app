import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const AuthContext = React.createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/user`) //
      .then((res) => {
        setUser(res.data.userName);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
