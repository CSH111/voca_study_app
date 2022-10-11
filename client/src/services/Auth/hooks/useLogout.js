import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const logout = () => {
    axios
      .delete("/api/session") //
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
