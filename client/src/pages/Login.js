import { AuthLink, Paper, PaperTitle } from "../components/common";
import { LoginForm } from "../components/Login";

const Login = () => {
  return (
    <Paper
      small
      paperHeader={<PaperTitle>로그인</PaperTitle>}
      paperFooter={<AuthLink to="/register">계정이 없으신가요?</AuthLink>}
    >
      <LoginForm />
    </Paper>
  );
};
export default Login;
