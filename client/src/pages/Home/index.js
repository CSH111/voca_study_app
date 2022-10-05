import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const Home = ({}) => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const store = useContext(DataContext);

  useEffect(() => {
    if (store.isLoggedIn) navigate("/topics");
  }, [store.isLoggedIn]);

  return (
    <>
      <div>환영합니다/</div>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleRegister}>회원가입</button>
    </>
  );
};

export default Home;
