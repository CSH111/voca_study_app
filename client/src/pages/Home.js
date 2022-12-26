import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer, Paper, PaperTitle, RectangularButton } from "../components/common";
import { Box, ButtonBox } from "../components/Home";
import { useAuthContext } from "../services/Auth/hooks/useAuthContext";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) navigate("/topics");
  }, [user]);

  return (
    <PageContainer>
      <Paper>
        <PaperTitle>초간단 단어장에 오신 것을 환영합니다</PaperTitle>
        <ButtonBox>
          <RectangularButton onClick={handleLogin}>로그인</RectangularButton>
          <RectangularButton onClick={handleRegister}>회원가입</RectangularButton>
        </ButtonBox>
      </Paper>
    </PageContainer>
  );
};

export default Home;
