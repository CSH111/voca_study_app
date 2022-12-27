import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const { setUser, setIsLoading: setAuthLoading } = useAuthContext();
  const navigate = useNavigate();

  const login = async (body, callback) => {
    axios
      .post("/api/session", body)
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

    //   fetch("/api/session", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   }) //
    //     .then((res) => {
    //       console.log(res);
    //       console.log("잘받음");
    //       if (!res.ok) {
    //         throw new Error(`${res.status}`);
    //       }
    //       // return res.json();
    //     })
    //     .then((data) => {
    //       console.log(data);
    //       setUser(data.userName);
    //       alert("로그인성공");
    //       navigate("/topics");
    //     })
    //     .catch((err) => {
    //       console.dir(err);
    //       alert(err.message);
    //       // alert(err.response.data.msg);
    //     });
  };
  return { login }; //에러 메세지도 리턴 ㄱ state로
};
