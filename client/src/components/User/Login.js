import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Form from "../Form";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";

const StyeldForm = styled(Form)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const emailInput = useRef();

  useEffect(() => {
    emailInput.current.focus();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const body = {
      email: email,
      pw: pw,
    };
    axios
      .post("/api/login", body)
      .then((res) => {
        console.log(res.data);
        alert("로그인성공");
        navigate("/");
      })
      .catch((err) => {
        console.log("에러..");
        console.log(err);
        alert(err.response.data.msg);
      });
  };
  const goRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <StyeldForm
      className="registerForm"
      inputs={[
        {
          label: "이메일",
          setValueFn: setEmail,
          ref: emailInput,
          type: "email",
        },
        {
          label: "비밀번호",
          setValueFn: setPw,
          type: "password",
        },
      ]}
      buttons={[
        {
          value: "로그인",
          onClick: handleLogin,
        },
        {
          value: "회원가입",
          onClick: goRegister,
        },
      ]}
    />
  );
};

export default Login;
