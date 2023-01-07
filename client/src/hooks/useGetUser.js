import { authActionType as AT } from "../constants";
import { useAuthDispatch } from "../context";
import { authService } from "../services";

const useGetUser = () => {
  const dispatch = useAuthDispatch();

  const getUser = async () => {
    dispatch({ type: AT.GET_USER_PENDING });
    try {
      const res = await authService.getUser();
      dispatch({ type: AT.GET_USER_FULFILLED, payload: res.data.userName });
    } catch (err) {
      dispatch({ type: AT.GET_USER_REJECTED });
    }
  };

  return getUser;
};

export default useGetUser;
