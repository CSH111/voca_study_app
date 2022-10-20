import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <>
      <LoginForm />
      <Link to="/register">회원가입</Link>
    </>
  );
};
export default Login;
