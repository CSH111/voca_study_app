import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputBox from "../InputBox";
import Form from "../Form";
import Button from "../Button";
import { useState } from "react";
const StyeldForm = styled(Form)``;
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(email + pw);
  };
  const goRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <StyeldForm
      className="registerForm"
      inputs={[
        {
          label: "이메일",
          setStateFn: setEmail,
        },
        {
          label: "비밀번호",
          setStateFn: setPw,
        },
      ]}
      buttons={[
        {
          value: "로그인",
          onClick: handleLogin,
        },
        {
          value: "회원가입",
          onClick: goRegister,
        },
      ]}
    />
  );
};

export default Login;
