import { useState } from "react";
import { useEffect, useRef } from "react";
import { Form, Input } from "../common/Form";
import { useRegister } from "../../services/Auth/hooks/useRegister";
import * as S from "./styles";
const RegisterForm = () => {
  const inputs = useRef({});
  const { register } = useRegister();

  const [allValid, setAllValid] = useState(false);
  const [pwValue, setPwValue] = useState("");
  const handlePwChange = (value) => setPwValue(value);

  const handleChange = (values, isAllValid) => {
    setAllValid(isAllValid);
    // console.log(values);
    console.log(isAllValid);
  };

  const handleSubmit = (values) => {
    console.log(values);
    const {
      email: { value: email },
      name: { value: name },
      pw: { value: pw },
    } = values;
    console.log({ email, name, pw });

    register({ email, name, pw });
  };

  return (
    <S.Form onSubmit={handleSubmit} onChange={handleChange}>
      <S.Label htmlFor="email">이메일</S.Label>
      <S.Input
        id="email"
        name="email"
        type="email"
        ref={(elem) => (inputs.current.email = elem)}
        errorMsg={"잘못된 이메일 형식입니다."}
        required
        autoFocus
      />
      <S.Label htmlFor="name">이름</S.Label>
      <S.Input
        id="name"
        name="name"
        type="text"
        ref={(elem) => (inputs.current.name = elem)}
        required
        // 랜덤 사용자 이름 부여하기
      />
      <S.Label htmlFor="pw">비밀번호</S.Label>
      <S.Input
        id="pw"
        name="pw"
        type="password"
        ref={(elem) => (inputs.current.pw = elem)}
        onChange={handlePwChange}
        required
        pattern="(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,}).*$"
        errorMsg={"8-20자의 영문 숫자 조합"}
      />
      <S.Label htmlFor="pwConfirm">비밀번호 확인</S.Label>
      <S.Input
        id="pwConfirm"
        name="pwConfirm"
        type="password"
        ref={(elem) => (inputs.current.confirmPw = elem)}
        required
        pattern={pwValue}
        errorMsg={"불일치"}
      />
      <S.Button type="submit" disabled={!allValid}>
        가입
      </S.Button>
    </S.Form>
  );
};

export default RegisterForm;
