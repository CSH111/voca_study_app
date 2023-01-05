import { Navigate, Outlet } from "react-router-dom";
import { useAuthSeletor } from "../context";
import { LoadingCover } from "../components/common";

const PublicRoutes = () => {
  const { user, isLoading } = useAuthSeletor();
  return !user ? (
    <>
      <Outlet />
      {isLoading && <LoadingCover />}
    </>
  ) : (
    <Navigate to="/topics" />
  );
};
export default PublicRoutes;
