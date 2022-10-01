import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../common/Form/Form";
import Input from "../common/Form/Input";
import { StyledInput } from "../common/Form/styles";
//로그인 기억하기 옵션
// 비밀번호 불일치시 아이디값 남겨두기
const LoginForm = () => {
  const emailInput = useRef();
  const pwInput = useRef();
  const navigate = useNavigate();
  const handleRegister = () => navigate("/register");

  // const isEmpty = (value) => value.trim() === "";
  const handleLogin = (context) => {
    const setValues = context.setValues;
    const { email, pw } = context.values;
    const body = { email, pw };
    axios
      .post("/api/login", body)
      .then(() => {
        alert("로그인성공");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        //에러 종류에 따라 처리
        alert(err.response.data.msg);
        emailInput.current.focus();
      });
  };

  return (
    <Form onSubmit={handleLogin}>
      <StyledInput
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
