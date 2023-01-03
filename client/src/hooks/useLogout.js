import { useNavigate } from "react-router-dom";
import { AuthService } from "../services";
import { useAuthContext } from "../context";

const useLogout = () => {
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

export default useLogout;
