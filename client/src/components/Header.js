import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const Header = ({ msg, setMsg, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const onLogOutCLick = (arg) => {
    console.log("zz");
    axios
      .post("/api/logout", null) //
      .then((res) => {
        setMsg("");
        setIsLoggedIn(false);
        navigate("/login");
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
        {isLoggedIn ? <button onClick={onLogOutCLick}>로그아웃</button> : null}
      </h2>
    </StyledHeader>
  );
};
export default Header;
