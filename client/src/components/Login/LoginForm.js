import { useEffect } from "react";
import { useRef } from "react";
import { authErrName as EN } from "../../constants";
import { useAuthSeletor } from "../../context";
import { useLogin } from "../../hooks";
import * as S from "./styles";

const LoginForm = () => {
  const emailInput = useRef();
  const pwInput = useRef();
  const login = useLogin();
  const { errName } = useAuthSeletor();

  const handleSubmit = (values) => {
    const {
      email: { value: email },
      pw: { value: pw },
    } = values;
    login({ email, pw });
  };

  useEffect(() => {
    if (!errName) return;
    switch (errName) {
      case EN.LOGIN_NO_EMAIL:
        emailInput.current.focus();
        return;
      case EN.LOGIN_WRONG_PW:
        pwInput.current.focus();
        return;
      default:
    }
  }, [errName]);

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
