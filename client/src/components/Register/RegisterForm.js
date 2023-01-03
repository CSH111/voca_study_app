import { useState } from "react";
import { useRef } from "react";
import { useRegister } from "../../hooks";
import * as S from "./styles";
const RegisterForm = () => {
  const inputs = useRef({});
  const { register } = useRegister();
  const [
    { email: emailState, name: nameState, pw: pwState, pwConfirm: pwConfirmState },
    setControlState,
  ] = useState({});
  const [allValid, setAllValid] = useState(false);
  const [pwValue, setPwValue] = useState("");
  const handlePwChange = (value) => setPwValue(value);

  const handleChange = (inputStates, isAllValid) => {
    setAllValid(isAllValid);
    setControlState(inputStates);
  };

  const handleSubmit = (values) => {
    const {
      email: { value: email },
      name: { value: name },
      pw: { value: pw },
    } = values;

    register({ email, name, pw });
  };

  return (
    <S.Form onSubmit={handleSubmit} onChange={handleChange}>
      <S.LabelAndMsgBox>
        <S.Label htmlFor="email">이메일 *</S.Label>
        <S.ValidityMsg>
          {emailState?.value && !emailState?.validity && emailState?.validityMsg}
        </S.ValidityMsg>
      </S.LabelAndMsgBox>
      <S.Input
        id="email"
        name="email"
        type="email"
        ref={(elem) => (inputs.current.email = elem)}
        errorMsg={"잘못된 이메일 형식입니다"}
        required
        autoFocus
      />
      <S.LabelAndMsgBox>
        <S.Label htmlFor="name">이름</S.Label>
        <S.ValidityMsg>
          {nameState?.value && !nameState?.validity && nameState?.validityMsg}
        </S.ValidityMsg>
      </S.LabelAndMsgBox>
      <S.Input id="name" name="name" type="text" ref={(elem) => (inputs.current.name = elem)} />
      <S.LabelAndMsgBox>
        <S.Label htmlFor="pw">비밀번호 *</S.Label>
        <S.ValidityMsg>
          {pwState?.value && !pwState?.validity && pwState?.validityMsg}
        </S.ValidityMsg>
      </S.LabelAndMsgBox>
      <S.Input
        id="pw"
        name="pw"
        type="password"
        ref={(elem) => (inputs.current.pw = elem)}
        onChange={handlePwChange}
        required
        pattern="(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,}).*$"
        errorMsg={"8-20자의 영문 숫자 조합을 입력하세요"}
      />
      <S.LabelAndMsgBox>
        <S.Label htmlFor="pwConfirm">비밀번호 확인 *</S.Label>
        <S.ValidityMsg>
          {pwConfirmState?.value && !pwConfirmState?.validity && pwConfirmState?.validityMsg}
        </S.ValidityMsg>
      </S.LabelAndMsgBox>
      <S.Input
        id="pwConfirm"
        name="pwConfirm"
        type="password"
        ref={(elem) => (inputs.current.confirmPw = elem)}
        required
        pattern={pwValue}
        errorMsg={"비밀번호가 일치하지 않습니다"}
      />
      <S.Button type="submit" disabled={!allValid}>
        가입
      </S.Button>
    </S.Form>
  );
};

export default RegisterForm;
