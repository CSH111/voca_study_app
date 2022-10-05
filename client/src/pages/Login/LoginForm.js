import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/common/Form/Form";
import Input from "../../components/common/Form/Input";
import { StyledInput } from "../../components/common/Form/styles";
import { DataContext } from "../../context/DataContext";

//로그인 기억하기 옵션
// 비밀번호 불일치시 아이디값 남겨두기
const LoginForm = () => {
  const emailInput = useRef();
  const pwInput = useRef();
  const navigate = useNavigate();
  const store = useContext(DataContext);

  const handleRegister = () => navigate("/register");

  const handleLogin = (formContext) => {
    const { email, pw } = formContext.values;
    const body = { email, pw };
    axios
      .post("/api/login", body)
      .then((res) => {
        store.setUserName(res.data.userName);
        store.setIsLoggedIn(true);
        alert("로그인성공");
        navigate("/topics");
      })
      .catch((err) => {
        console.log(err);
        //에러 종류에 따라 처리
        alert(err.response.data.msg);
        emailInput.current.focus();
      });
  };
  // auth app에서 처리하기
  return (
    <Form onSubmit={handleLogin}>
      <Input
        label="이메일"
        id="email"
        name="email"
        type="text"
        ref={emailInput}
      />
      <Input label="비밀번호" id="pw" name="pw" type="password" ref={pwInput} />
      <button type="submit">로그인</button>
      <button type="button" onClick={handleRegister}>
        회원가입
      </button>
    </Form>
  );
};

export default LoginForm;
