import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useAuthContext from "../../services/Auth/useAuthContext";
import { DataContext } from "../../services/DataContext";

const StyledHeader = styled.header`
  width: 100%;
  h1 {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 1.25rem;
    font-size: 0.7rem;
    background-color: #9f90b6;
    top: 0;
    right: 0;
    color: white;
    padding: 0.1rem;
  }
  h2 {
    font-size: 2.25rem;
    height: 3.25rem;
    background-color: #d0c0e8;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const store = useContext(DataContext);
  const currentParam = store.params.topic;
  // const userName = store.userName;
  // const isLoggedIn = store.isLoggedIn;
  // const setIsLoggedIn = store.setIsLoggedIn;
  const [msg, setMsg] = useState("");
  const location = useLocation();

  const { isLoggedIn, setIsLoggedIn, userName } = useAuthContext();

  useEffect(() => {
    switch (location.pathname) {
      case "/bookmark":
        setMsg("my Bookmark");
        break;
      case "/topics":
        setMsg(`${userName}'s wordbook`);
        break;
      default:
        setMsg(currentParam);
    }
  }, [currentParam, location, userName]);

  const handleLogout = () => {
    axios
      .post("/api/logout") //
      .then(() => {
        store.setUserName("");
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("로그아웃 실패");
      });
  };

  return (
    <StyledHeader>
      <h1>초간단 단어장</h1>
      <h2>
        {msg}
        {isLoggedIn ? <button onClick={handleLogout}>로그아웃</button> : null}
      </h2>
    </StyledHeader>
  );
};
export default Header;
