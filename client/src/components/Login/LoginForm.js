import React from "react";
import { useRef } from "react";
import { Form, Input } from "../common/Form";
import { useLogin } from "../../services/Auth/hooks/useLogin";
import * as S from "./styles";
import { RectangularButton } from "../common";
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
    <S.Form onSubmit={handleSubmit}>
      <S.Label htmlFor="email">이메일</S.Label>
      <S.Input name="email" type="text" ref={emailInput} />
      <S.Label htmlFor="pw">비밀번호</S.Label>
      <S.Input name="pw" type="password" ref={pwInput} />
      <S.Button type="submit">로그인</S.Button>
    </S.Form>
  );
};

export default LoginForm;
