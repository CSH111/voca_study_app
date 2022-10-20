import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <>
      <RegisterForm />
      <Link to="/login">로그인</Link>
    </>
  );
};

export default Register;
