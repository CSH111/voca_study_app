import { useNavigate } from "react-router-dom";

import { AuthButton, Paper, PaperTitle } from "../components/common";
import { ButtonBox } from "../components/Home";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");

  return (
    <Paper paperHeader={<PaperTitle>Welcome!</PaperTitle>}>
      <ButtonBox>
        <AuthButton onClick={handleLogin} variant="contained" themeColor="primary" angleBorder>
          로그인
        </AuthButton>
        <AuthButton onClick={handleRegister} variant="contained" themeColor="primary" angleBorder>
          회원가입
        </AuthButton>
      </ButtonBox>
    </Paper>
  );
};

export default Home;
