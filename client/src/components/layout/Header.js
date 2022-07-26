import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../../services/Auth/hooks/useAuthContext";
import { useLogout } from "../../services/Auth/hooks/useLogout";

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
  const { topic } = useParams();
  const [msg, setMsg] = useState("");
  const location = useLocation();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    switch (location.pathname) {
      case "/bookmark":
        setMsg("my Bookmark");
        break;
      case "/topics":
        setMsg(`${user}'s wordbook`);
        break;
      default:
        setMsg(topic);
    }
  }, [location, user]);

  const handleLogout = () => logout();

  return (
    <StyledHeader>
      <h1>초간단 단어장</h1>
      <h2>
        {msg}
        {user ? <button onClick={handleLogout}>로그아웃</button> : null}
      </h2>
    </StyledHeader>
  );
};
export default Header;
