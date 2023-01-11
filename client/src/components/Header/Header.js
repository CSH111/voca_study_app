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
      <h1>초간단 단어장</h1>
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
  min-height: 80px;
  box-shadow: 0px 2px 5px 0px #525252;
  margin-bottom: 10px;
  h1 {
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
