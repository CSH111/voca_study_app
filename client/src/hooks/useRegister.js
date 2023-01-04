import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import { useAuthContext } from "../context";

const useRegister = () => {
  const { setUser, setIsLoading: setAuthLoading } = useAuthContext();
  const navigate = useNavigate();

  const register = (body) => {
    authService
      .register(body)
      .then((res) => {
        if (res.data.success) {
          alert("가입성공");
          setUser(res.data.userName);
          setAuthLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.code === 11000) return alert("중복된 이메일");
        alert("가입실패");
      });
  };

  return { register };
};

export default useRegister;
