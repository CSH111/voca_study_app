import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const register = (body) => {
    axios
      .post("/api/user", body)
      .then((res) => {
        if (res.data.success) {
          alert("가입성공");
          setUser(res.data.userName);
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
