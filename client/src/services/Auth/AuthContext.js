import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

export const AuthContext = React.createContext(null);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(`/api/user`) //
      .then((res) => {
        setUser(res.data.userName);
      })
      .catch(console.log);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
