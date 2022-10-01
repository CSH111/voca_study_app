import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import LoginForm from "../components/Login/LoginForm";

const Login = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};
export default Login;
