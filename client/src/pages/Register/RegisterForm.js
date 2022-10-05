import React from "react";
import axios from "axios";
import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/common/Form/Form";
import Input from "../../components/common/Form/Input";
import { DataContext } from "../../context/DataContext";

const RegisterForm = () => {
  const inputs = useRef({});
  const navigate = useNavigate();
  const store = useContext(DataContext);
  useEffect(() => {
    inputs.current.email.focus();
  }, []);

  const confirmValid = () => {
    for (let key in inputs.current) {
      if (inputs.current[key].value === "") {
        alert(`모두 입력하세요`);
        inputs.current[key].focus();
        break;
      }
    }
  };
  const handleBack = () => navigate(-1);
  const handleRegister = (ctx) => {
    confirmValid();
    const body = {
      name: ctx.values.name,
      email: ctx.values.email,
      pw: ctx.values.pw,
    };
    console.log(body);
    axios
      .post("/api/user", body)
      .then((res) => {
        if (res.data.success) {
          alert("가입성공");
          store.setUserName(res.data.userName);
          store.setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.code === 11000)
          return alert("중복된 이메일");
        alert("가입실패");
      });
    // emailInput.current.focus();
    // context.setValues({ email: "", pw: "" }); // 모든 인풋 value 비우기 2
    // context.setValues((values) => ({ ...values, pw: "" })); //pw 만 비우기
  };
  return (
    <Form onSubmit={handleRegister}>
      <Input
        label="이메일"
        id="email"
        name="email"
        type="text"
        // ref={emailInput}
        ref={(elem) => (inputs.current.email = elem)}
      />
      <Input
        label="이름 " //
        id="name"
        name="name"
        type="text"
        ref={(elem) => (inputs.current.name = elem)}
      />
      <Input
        label="비밀번호" //
        id="pw"
        name="pw"
        type="password"
        ref={(elem) => (inputs.current.pw = elem)}
      />
      <Input
        label="비밀번호 확인"
        id="confirmPw"
        name="confirmPw"
        type="password"
        ref={(elem) => (inputs.current.confirmPw = elem)}
      />
      <button type="button" onClick={handleBack}>
        뒤로가기
      </button>
      <button type="submit">제출</button>
    </Form>
  );
};

export default RegisterForm;
