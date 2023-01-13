import { useNavigate } from "react-router-dom";

import { authActionType as AAT, wordbookActionType as WAT } from "../constants";
import { useAuthDispatch, useWordbookDispatch } from "../context";
import { authService } from "../services";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatchAuth = useAuthDispatch();
  const dispatchWordbook = useWordbookDispatch();

  const logout = async () => {
    dispatchAuth({ type: AAT.LOGOUT_PENDING });
    try {
      await authService.logout();
      dispatchAuth({ type: AAT.LOGOUT_FULFILLED, payload: "" });
      dispatchWordbook({ type: WAT.CLEAR_WORDBOOK });
      navigate("/");
    } catch (err) {
      dispatchAuth({ type: AAT.LOGOUT_REJECTED });
      alert("로그아웃 실패");
    }
  };
  return logout;
};

export default useLogout;
