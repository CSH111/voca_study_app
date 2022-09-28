import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "../components/common/Form";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    nameInput.current.focus();
  }, []);

  const isValidAll = () => {
    if (name.trim() && email.trim && isValidPw && isSame) {
      return true;
    }
    return false;
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    if (!isValidAll()) return alert("재입력하셈");
    const body = {
      name: name,
      email: email,
      pw: pw,
    };
    axios
      .post("/api/user", body)
      .then((res) => {
        if (res.data.success) {
          alert("가입성공");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.code === 11000)
          return alert("중복된 이메일");
        alert("가입실패");
      });
  };
  const onReturnClick = (e) => {
    e.preventDefault();
    navigate(-1);
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
          type: "text",
          setValueFn: setName,
          ref: nameInput,
        },
        {
          label: "이메일",
          type: "email",
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
        {
          value: <FontAwesomeIcon icon={["fas", "undo"]} />,
          onClick: onReturnClick,
        },
      ]}
    />
  );
};

export default Register;
