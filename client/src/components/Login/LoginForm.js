import { useEffect } from "react";
import { useRef } from "react";
import { authErrName as EN } from "../../constants";
import { useAuthSeletor } from "../../context";
import { useLogin } from "../../hooks";
import * as S from "./styles";

const focusIfEmpty = (elemRef) => {
  if (!elemRef.current.value) {
    elemRef.current.focus();
    return true;
  }
  return false;
};

const LoginForm = () => {
  const emailInput = useRef();
  const pwInput = useRef();
  const login = useLogin();
  const {
    isError,
    error: { errName, msg },
  } = useAuthSeletor();

  const handleSubmit = (values) => {
    if (focusIfEmpty(emailInput)) return;
    if (focusIfEmpty(pwInput)) return;

    const {
      email: { value: email },
      pw: { value: pw },
    } = values;

    login({ email, pw });
  };

  useEffect(() => {
    if (!isError) return;
    switch (errName) {
      case EN.LOGIN_NO_EMAIL:
        emailInput.current.focus();
        return;
      case EN.LOGIN_WRONG_PW:
        pwInput.current.focus();
        return;
      default:
    }
  }, [errName, isError]);
  //TODO: 메세지 출력?
  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Label htmlFor="email">이메일</S.Label>
      <S.Input name="email" type="text" ref={emailInput} />
      <S.Label htmlFor="pw">비밀번호</S.Label>
      <S.Input name="pw" type="password" ref={pwInput} />
      <S.Msg>{isError && msg}</S.Msg>
      <S.Button type="submit">로그인</S.Button>
    </S.Form>
  );
};

export default LoginForm;
