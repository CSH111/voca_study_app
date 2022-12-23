import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { Form } from "../../components/common/Form/Form";
import Input from "../../components/common/Form/Input";
import { useLogin } from "../../services/Auth/hooks/useLogin";

//로그인 기억하기 옵션
// 비밀번호 불일치시 아이디값 남겨두기

const LoginForm = () => {
  const emailInput = useRef();
  const pwInput = useRef();
  const { login } = useLogin();

  const handleSubmit = (values) => {
    const {
      email: { value: email },
      pw: { value: pw },
    } = values;
    login({ email, pw });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="email">이메일</label>
      <Input id="email" name="email" type="text" ref={emailInput} />
      <label htmlFor="pw">비밀번호</label>
      <Input id="pw" name="pw" type="password" ref={pwInput} />
      <button type="submit">로그인</button>
    </Form>
  );
};

export default LoginForm;
