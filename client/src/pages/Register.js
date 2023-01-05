import { RegisterForm } from "../components/Register";
import { AuthLink, PageContainer, Paper, PaperTitle } from "../components/common";

const Register = () => {
  return (
    <PageContainer>
      <Paper
        paperHeader={<PaperTitle>회원가입</PaperTitle>}
        paperFooter={<AuthLink to="/login">로그인하러 가기</AuthLink>}
      >
        <RegisterForm />
      </Paper>
    </PageContainer>
  );
};

export default Register;
