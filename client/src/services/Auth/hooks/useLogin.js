import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (body, callback) => {
    axios
      .post("/api/session", body)
      .then((res) => {
        setUser(res.data.userName);
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
