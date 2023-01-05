import { Navigate, Outlet } from "react-router-dom";
import { LoadingCover } from "../components/common";
import { useAuthSeletor } from "../context";

const PrivateRoutes = () => {
  const { user, isLoading } = useAuthSeletor();

  return user ? (
    <>
      <Outlet />
      {isLoading && <LoadingCover />}
    </>
  ) : (
    <Navigate to="/" />
  );
};
export default PrivateRoutes;
