import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import { useAuthDispatch } from "../context";
import { authActionType as AT } from "../constants";

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
      dispatch({ type: AT.REGISTER_REJECTED });
      alert(err.response.data.msg);
    }
  };

  return register;
};

export default useRegister;
