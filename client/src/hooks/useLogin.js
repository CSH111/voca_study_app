import { useNavigate } from "react-router-dom";
import { AuthService } from "../services";
import { useAuthContext } from "../context";

const useLogin = () => {
  const { setUser, setIsLoading: setAuthLoading } = useAuthContext();
  const navigate = useNavigate();

  const login = async (body) => {
    AuthService.login(body)
      .then((res) => {
        console.log(res);
        setUser(res.data.userName);
        setAuthLoading(false);
        alert("로그인성공");
        navigate("/topics");
      })
      .catch((err) => {
        console.log(err);
        //에러 종류에 따라 처리
        alert(err.response.data.msg);
      });
  };
  return { login }; //에러 메세지도 리턴 ㄱ state로
};

export default useLogin;
