import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import { useAuthDispatch } from "../context";
import { authActionType as AT } from "../constants";

const useLogin = () => {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const login = async (body) => {
    dispatch({ type: AT.LOGIN_PENDING });
    try {
      const res = await authService.login(body);
      dispatch({ type: AT.LOGIN_FULFILLED, payload: res.data.userName });
      navigate("/topics");
    } catch (err) {
      const { errName, msg } = err.response.data;
      dispatch({ type: AT.LOGIN_REJECTED, payload: { errName, msg } });
    }
  };
  return login;
};

export default useLogin;
