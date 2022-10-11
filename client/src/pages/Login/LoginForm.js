import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/common/Form/Form";
import Input from "../../components/common/Form/Input";
import { useLogin } from "../../services/Auth/hooks/useLogin";

//로그인 기억하기 옵션
// 비밀번호 불일치시 아이디값 남겨두기

const LoginForm = () => {
  const emailInput = useRef();
  const pwInput = useRef();
  const navigate = useNavigate();
  const { login } = useLogin();

  const handleRegister = () => navigate("/register");

  const handleLogin = (formContext) => {
    const { email, pw } = formContext.values;
    const body = { email, pw };
    login(body);
  };

  // auth app에서 처리하기

  return (
    <Form onSubmit={handleLogin}>
      <Input
        label="이메일"
        id="email"
        name="email"
        type="text"
        ref={emailInput}
      />
      <Input label="비밀번호" id="pw" name="pw" type="password" ref={pwInput} />
      <button type="submit">로그인</button>
      <button type="button" onClick={handleRegister}>
        회원가입
      </button>
    </Form>
  );
};

export default LoginForm;
