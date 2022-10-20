import { useState } from "react";
import { useEffect, useRef } from "react";
import { Form } from "../../components/common/Form/Form";
import Input from "../../components/common/Form/Input";
import { useRegister } from "../../services/Auth/hooks/useRegister";

const RegisterForm = () => {
  const inputs = useRef({});
  const { register } = useRegister();
  // useEffect(() => {
  //   inputs.current.email.focus();
  // }, []);

  // const confirmValid = () => {
  //   for (let key in inputs.current) {
  //     if (inputs.current[key].value === "") {
  //       alert(`모두 입력하세요`);
  //       inputs.current[key].focus();
  //       break;
  //     }
  //   }
  // };

  const [allValid, setAllValid] = useState(false);
  const [pwValue, setPwValue] = useState("");
  const handlePwChange = (value) => setPwValue(value);

  const handleValidity = (validity) => {
    setAllValid(validity ? true : false);
  };

  const handleSubmit = (values) => {
    const { email, name, pw } = values;
    const body = { email, name, pw };
    console.log(body);
    register(body);
  };

  return (
    <Form onSubmit={handleSubmit} onChange={handleValidity}>
      <label htmlFor="email">이메일</label>
      <Input
        id="email"
        name="email"
        type="email"
        ref={(elem) => (inputs.current.email = elem)}
        errorMsg={"잘못된 이메일 형식입니다."}
        required
        autoFocus
      />
      <label htmlFor="name">이름</label>
      <Input
        id="name"
        name="name"
        type="text"
        ref={(elem) => (inputs.current.name = elem)}
        required
        // 랜덤 사용자 이름 부여하기
      />
      <label htmlFor="pw">비밀번호</label>
      <Input
        id="pw"
        name="pw"
        type="password"
        ref={(elem) => (inputs.current.pw = elem)}
        onChange={handlePwChange}
        required
        pattern="(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,}).*$"
        errorMsg={"8-20자의 영문 숫자 조합"}
      />
      <label htmlFor="pwConfirm">비밀번호 확인</label>
      <Input
        id="pwConfirm"
        name="pwConfirm"
        type="password"
        ref={(elem) => (inputs.current.confirmPw = elem)}
        required
        pattern={pwValue}
        errorMsg={"불일치"}
      />
      <button type="submit" disabled={!allValid}>
        제출
      </button>
    </Form>
  );
};

export default RegisterForm;
