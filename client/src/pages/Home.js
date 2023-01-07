import { useNavigate } from "react-router-dom";
import { Paper, PaperTitle, RectangularButton } from "../components/common";
import { ButtonBox } from "../components/Home";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  return (
    <Paper paperHeader={<PaperTitle>초간단 단어장에 오신 것을 환영합니다</PaperTitle>}>
      <ButtonBox>
        <RectangularButton onClick={handleLogin}>로그인</RectangularButton>
        <RectangularButton onClick={handleRegister}>회원가입</RectangularButton>
      </ButtonBox>
    </Paper>
  );
};

export default Home;
