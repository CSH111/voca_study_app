import { Link } from "react-router-dom";
import { AuthLink, PageContainer, Paper, PaperTitle } from "../components/common";
import { LoginForm } from "../components/Login";

const Login = () => {
  return (
    <PageContainer>
      <Paper
        paperHeader={<PaperTitle>로그인</PaperTitle>}
        paperFooter={
          <AuthLink to="/register">계정이 없으신가요?</AuthLink>
          // <AuthLink to="/register">회원가입</AuthLink>
        }
      >
        <LoginForm />
      </Paper>
    </PageContainer>
  );
};
export default Login;
