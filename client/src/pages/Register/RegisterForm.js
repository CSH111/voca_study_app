import React from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/common/Form/Form";
import Input from "../../components/common/Form/Input";
import { useRegister } from "../../services/Auth/hooks/useRegister";

const RegisterForm = () => {
  const inputs = useRef({});
  const navigate = useNavigate();
  const { register } = useRegister();
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
    register(body);
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
