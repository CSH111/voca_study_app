import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../services/Auth/AuthContext";

const Home = ({}) => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (isLoggedIn) navigate("/topics");
  }, [isLoggedIn]);

  return (
    <>
      <div>환영합니다/</div>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleRegister}>회원가입</button>
    </>
  );
};

export default Home;
