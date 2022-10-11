import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../services/Auth/hooks/useAuthContext";

const Home = ({}) => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) navigate("/topics");
  }, [user]);

  return (
    <>
      <div>환영합니다/</div>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleRegister}>회원가입</button>
    </>
  );
};

export default Home;
