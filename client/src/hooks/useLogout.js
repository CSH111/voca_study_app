import { useNavigate } from "react-router-dom";

import { authActionType as AT } from "../constants";
import { useAuthDispatch } from "../context";
import { authService } from "../services";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const logout = async () => {
    dispatch({ type: AT.LOGOUT_PENDING });
    try {
      await authService.logout();
      dispatch({ type: AT.LOGOUT_FULFILLED, payload: "" });
      navigate("/");
    } catch (err) {
      dispatch({ type: AT.LOGOUT_REJECTED });
      alert("로그아웃 실패");
    }
  };
  return logout;
};

export default useLogout;
