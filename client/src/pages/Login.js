import { AuthLink, PageContainer, Paper, PaperTitle } from "../components/common";
import { LoginForm } from "../components/Login";

const Login = () => {
  return (
    <PageContainer>
      <Paper
        paperHeader={<PaperTitle>로그인</PaperTitle>}
        paperFooter={<AuthLink to="/register">계정이 없으신가요?</AuthLink>}
      >
        <LoginForm />
      </Paper>
    </PageContainer>
  );
};
export default Login;
