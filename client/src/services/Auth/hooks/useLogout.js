import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import AuthService from "../..";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const logout = () => {
    AuthService.logout()
      .then(() => {
        setUser("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("로그아웃 실패");
      });
  };
  return { logout };
};
