import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthService } from "../services";

const AuthContext = React.createContext(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //TODO: App.js 로 위치수정, App 의 라우터는 분리
  useEffect(() => {
    AuthService.getUser()
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
