import { useRef, useState } from "react";

import { useAuthSeletor } from "../../context";
import { useRegister } from "../../hooks";
import { AuthButton } from "../common";
import * as S from "./styles";

const RegisterForm = () => {
  const inputs = useRef({});
  const register = useRegister();
  const {
    isError,
    error: { msg },
  } = useAuthSeletor();
  const [
    { email: emailState, name: nameState, pw: pwState, pwConfirm: pwConfirmState },
    setControlState,
  ] = useState({});
  const [allValid, setAllValid] = useState(false);

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
  //pw가 바뀔 때 confirm 리로드하도록
  return (
    <S.Form onSubmit={handleSubmit} onChange={handleChange}>
      <S.LabelAndMsgBox>
        <S.Label htmlFor="email" required>
          이메일
        </S.Label>
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
      <S.Label htmlFor="name">이름</S.Label>
      <S.Input id="name" name="name" type="text" ref={(elem) => (inputs.current.name = elem)} />
      <S.LabelAndMsgBox>
        <S.Label htmlFor="pw" required>
          비밀번호
        </S.Label>
        <S.ValidityMsg>
          {pwState?.value && !pwState?.validity && pwState?.validityMsg}
        </S.ValidityMsg>
      </S.LabelAndMsgBox>
      <S.Input
        id="pw"
        name="pw"
        type="password"
        ref={(elem) => (inputs.current.pw = elem)}
        autoComplete="off"
        required
        pattern="(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,}).*$"
        errorMsg={"8-20자의 영문 숫자 조합을 입력하세요"}
      />
      <S.LabelAndMsgBox>
        <S.Label htmlFor="pwConfirm" required>
          비밀번호 확인
        </S.Label>
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
        autoComplete="off"
        pattern={pwState?.value}
        errorMsg={"비밀번호가 일치하지 않습니다"}
      />
      <S.ResultMsg>{isError && msg}</S.ResultMsg>
      <AuthButton
        type="submit"
        disabled={!allValid}
        variant="contained"
        themeColor="primary"
        angleBorder
      >
        가입
      </AuthButton>
    </S.Form>
  );
};

export default RegisterForm;
