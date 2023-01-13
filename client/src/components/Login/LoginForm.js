import { useEffect, useRef } from "react";

import { authErrName as AEN } from "../../constants";
import { useAuthSeletor } from "../../context";
import { useLogin } from "../../hooks";
import { focusIfEmptyRefValue } from "../../utils";
import { AuthButton } from "../common";
import * as S from "./styles";

const LoginForm = () => {
  const emailInput = useRef();
  const pwInput = useRef();
  const login = useLogin();
  const {
    isError,
    error: { errName, msg },
  } = useAuthSeletor();

  const handleSubmit = (values) => {
    if (focusIfEmptyRefValue(emailInput)) return;
    if (focusIfEmptyRefValue(pwInput)) return;

    const {
      email: { value: email },
      pw: { value: pw },
    } = values;
    console.log(emailInput);

    login({ email, pw });
  };

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  useEffect(() => {
    if (!isError) return;
    switch (errName) {
      case AEN.LOGIN_NO_EMAIL:
        emailInput.current.focus();
        return;
      case AEN.LOGIN_WRONG_PW:
        pwInput.current.focus();
        return;
      default:
    }
  }, [errName, isError]);

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Label htmlFor="email">이메일</S.Label>
      <S.Input name="email" type="text" ref={emailInput} />
      <S.Label htmlFor="pw">비밀번호</S.Label>
      <S.Input name="pw" type="password" ref={pwInput} />
      <S.Msg>{isError && msg}</S.Msg>

      <AuthButton type="submit" variant="contained" themeColor="primary" angleBorder>
        로그인
      </AuthButton>
    </S.Form>
  );
};

export default LoginForm;
