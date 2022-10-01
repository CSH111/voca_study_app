import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/Register/RegisterForm";

const Register = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default Register;
