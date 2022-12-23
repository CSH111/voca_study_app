import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Paper from "../components/common/Paper";
import { useAuthContext } from "../services/Auth/hooks/useAuthContext";

const Home = ({}) => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) navigate("/topics");
  }, [user]);

  return (
    <StyledContainer>
      <StyledPaper>
        <div>환영합니다/</div>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={handleRegister}>회원가입</button>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Home;

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledPaper = styled(Paper)`
  /* background-color: coral; */
`;
