import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { INFO_URL } from "../../constants";
import { useAuthSeletor, useModal } from "../../context";
import { useLogout } from "../../hooks";
import { Button } from "../common";
import { BurgerIcon } from "../common/icons";
import { ConfirmModal, LogoutBtn } from "./";

const Header = () => {
  const logout = useLogout();
  const { user } = useAuthSeletor();
  const { openModal } = useModal();
  const [menuOn, setMenuOn] = useState(false);
  const navigate = useNavigate();

  const handleLogoutBtnClick = () => {
    openModal(<ConfirmModal onConfirm={logout} msg="로그아웃 하시겠습니까?" />);
  };

  const handleBurgerClick = () => {
    setMenuOn(true);
  };

  const handleMenuClick = () => {
    setMenuOn(false);
  };

  const handleLoginBtnClick = () => {
    navigate("/login");
  };

  const handleRegisterBtnClick = () => {
    navigate("/register");
  };

  return (
    <StyledHeader>
      <Link to="/">
        <h1>Hello Wordy</h1>
      </Link>
      <Nav>
        <a href={INFO_URL} target="_blank" rel="noreferrer">
          Information
        </a>
      </Nav>
      {user && (
        <div className="user-container">
          <div className="user-name-container">
            <span className="user-name">{user}</span>님
          </div>
          <LogoutBtn onClick={handleLogoutBtnClick} className="logout-btn">
            Logout
          </LogoutBtn>
        </div>
      )}
      <Button className="burger" onClick={handleBurgerClick}>
        <BurgerIcon />
      </Button>
      <SideMenu menuOn={menuOn} onClick={handleMenuClick}>
        <div className="cover"></div>
        <div className="item-box">
          <ul>
            {user ? (
              <li>
                <Button onClick={handleLogoutBtnClick} propagation={true}>
                  로그아웃
                </Button>
              </li>
            ) : (
              <>
                <li>
                  <Button onClick={handleLoginBtnClick} propagation={true}>
                    로그인
                  </Button>
                </li>
                <li>
                  <Button onClick={handleRegisterBtnClick} propagation={true}>
                    회원가입
                  </Button>
                </li>
              </>
            )}

            <li>
              <a href={INFO_URL} target="_blank" rel="noreferrer">
                <Button propagation={true}>Infomation</Button>
              </a>
            </li>
          </ul>
        </div>
      </SideMenu>
    </StyledHeader>
  );
};
export default Header;

const Nav = styled.nav`
  font-weight: bold;
  display: flex;
  flex: 1;
  margin: 0 10px;
  > * {
    margin: 0 15px;
    padding: 10px;
    transition: all 0.15s;
    &:hover {
      background-color: ${(p) => p.theme.color.primary.main};
      color: ${(p) => p.theme.color.secondary.main};
    }
  }
`;
const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  align-items: center;
  height: 0;
  min-height: 70px;
  box-shadow: 0px 2px 5px 0px ${(p) => p.theme.color.shadow.main};
  margin-bottom: 10px;
  @media (max-width: 700px) {
    min-height: 50px;
  }

  h1 {
    display: flex;
    align-items: center;
    padding: 10px;
    height: 40px;
    background-color: ${(p) => p.theme.color.primary.main};
    color: ${(p) => p.theme.color.secondary.main};
    font-weight: bold;
    a {
      display: block;
    }
    @media (max-width: 700px) {
      height: 30px;
    }
  }
  .user-container {
    display: flex;
    align-items: center;
    & :not(:last-child) {
      margin-right: 10px;
    }
    @media (max-width: 700px) {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
    .user-name-container {
      .user-name {
        font-size: 20px;
      }
    }
  }
  .burger {
    display: none;
  }
  @media (max-width: 700px) {
    ${Nav}, .logout-btn {
      display: none;
    }
    .burger {
      display: flex;
    }
  }
`;

const SideMenu = styled.menu`
  top: 0;
  right: 0;
  right: ${(p) => (p.menuOn ? "0" : "-100vw")};
  position: fixed;
  display: flex;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  transition: all 0.5s;
  z-index: 100;
  opacity: ${(p) => (p.menuOn ? "1" : "0")};

  .cover {
    flex: 1;
    background-color: transparent;
  }
  .item-box {
    right: 0;
    min-width: 250px;
    background-color: #000000da;
    padding: 10px;
    li {
      transition: all 0.15s;
      padding-bottom: 10px;
      border-bottom: 2px solid ${(p) => p.theme.color.gray.light};
      font-size: 25px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }

      button {
        font-size: 20px;
        color: ${(p) => p.theme.color.secondary.main};
        width: 100%;
        padding: 15px;

        &:hover {
          color: ${(p) => p.theme.color.primary.main};
          background-color: ${(p) => p.theme.color.secondary.main};
        }
      }
    }
  }
`;
