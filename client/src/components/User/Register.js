import React from "react";
import styled from "styled-components";
import Form from "../Form";
import { useState } from "react";
const StyeldForm = styled(Form)``;
const Register = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  return (
    <StyeldForm
      className="registerForm"
      inputs={[
        {
          label: "이메일",
          setStateFn: setEmail,
        },
        {
          label: "비밀번호",
          setStateFn: setPw,
        },
        {
          label: "비밀번호 확인",
          setStateFn: setConfirm,
        },
      ]}
      buttons={[
        {
          value: "회원가입",
          onClick: (e) => {
            e.preventDefault();
            alert(email);
          },
        },
      ]}
    />
  );
};

export default Register;
