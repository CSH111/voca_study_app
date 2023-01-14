import { AuthLink, Paper, PaperTitle } from "../components/common";
import { RegisterForm } from "../components/Register";

const Register = () => {
  return (
    <Paper
      height="auto"
      paperHeader={<PaperTitle>회원가입</PaperTitle>}
      paperFooter={
        <AuthLink to="/login" margin="10px 0 0 0">
          로그인하러 가기
        </AuthLink>
      }
    >
      <RegisterForm />
    </Paper>
  );
};

export default Register;
