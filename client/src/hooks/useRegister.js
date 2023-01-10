import { useNavigate } from "react-router-dom";

import { authActionType as AT } from "../constants";
import { useAuthDispatch } from "../context";
import { authService } from "../services";

const useRegister = () => {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const register = async (body) => {
    dispatch({ type: AT.REGISTER_PENDING });
    try {
      const res = await authService.register(body);
      dispatch({ type: AT.REGISTER_FULFILLED, payload: res.data.userName });
      navigate("/");
    } catch (err) {
      const msg = err.response.data.msg ?? "서버 오류";
      dispatch({ type: AT.REGISTER_REJECTED, payload: { msg } });
    }
  };

  return register;
};

export default useRegister;
