import styled from "styled-components";

import { useAuthSeletor } from "../../context";
import { useLogout } from "../../hooks";

const Header = () => {
  const logout = useLogout();
  const { user } = useAuthSeletor();

  const handleLogout = () => logout();

  return (
    <StyledHeader>
      <h1>초간단 단어장</h1>
      {user && (
        <div className="user-container">
          <div className="user-name-container">
            <span className="user-name">{user}</span>님
          </div>
          {user ? <button onClick={handleLogout}>로그아웃</button> : null}
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
  /* border-bottom: 2px solid black; */
  /* background-color: #ffffff; */
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
