import { Link } from "react-router-dom";
import styled from "styled-components";

import { useAuthSeletor, useModal } from "../../context";
import { useLogout } from "../../hooks";
import ConfirmModal from "./ConfirmModal";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  const logout = useLogout();
  const { user } = useAuthSeletor();
  const { openModal } = useModal();

  const handleLogoutBtnClick = () => {
    openModal(<ConfirmModal onConfirm={logout} msg="로그아웃 하시겠습니까?" />);
  };

  return (
    <StyledHeader>
      <Link to="/">
        <h1>VOCA STUDY</h1>
      </Link>
      {user && (
        <div className="user-container">
          <div className="user-name-container">
            <span className="user-name">{user}</span>님
          </div>
          {user ? <LogoutBtn onClick={handleLogoutBtnClick}>Logout</LogoutBtn> : null}
        </div>
      )}
    </StyledHeader>
  );
};
export default Header;

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
      /* height: 100%; */
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
    .user-name-container {
      .user-name {
        font-size: 20px;
      }
    }
  }
`;
