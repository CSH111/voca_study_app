import React from "react";
import axios from "axios";
import styled from "styled-components";
import Form from "../Form";
import { useState, useRef, useEffect } from "react";

const StyeldForm = styled(Form)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isValidPw, setIsValidPw] = useState(true);
  const [isSame, setIsSame] = useState(true);
  const nameInput = useRef();
  const pwInput = useRef();
  const pwConfirmInput = useRef();
  useEffect(() => {
    nameInput.current.focus();
  }, []);

  const onRegisterClick = (e) => {
    e.preventDefault();
    const body = {
      test: email,
    };
    axios
      .post("/api/main", body) //
      .then((res) => console.log(res.data))
      .catch(console.log);
  };

  const confirmIsValidPw = () => {
    //나중에 정규표현식으로 상세설정
    pwInput.current.value.length >= 8
      ? setIsValidPw(true)
      : setIsValidPw(false);
  };

  const confirmIsSamePw = () => {
    pwInput.current.value === pwConfirmInput.current.value
      ? setIsSame(true)
      : setIsSame(false);
  };

  return (
    <StyeldForm
      className="registerForm"
      inputs={[
        {
          label: "이름",
          setValueFn: setName,
          ref: nameInput,
        },
        {
          label: "이메일",
          setValueFn: setEmail,
        },
        {
          label: "비밀번호",
          type: "password",
          setValueFn: setPw,
          confirmIsValid: confirmIsValidPw,
          isValid: isValidPw,
          ref: pwInput,
          msg: "8자 이상입력하세요",
        },
        {
          label: "비밀번호 확인",
          type: "password",
          setValueFn: setConfirm,
          confirmIsValid: confirmIsSamePw,
          isValid: isSame,
          ref: pwConfirmInput,
          msg: "일치하지 않습니다.",
        },
      ]}
      buttons={[
        {
          value: "회원가입",
          onClick: onRegisterClick,
          // disabled: true,
        },
      ]}
    />
  );
};

export default Register;
