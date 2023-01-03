import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context";
import Loading from "../pages/Loading";
const PrivateRoutes = () => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <Loading />;
  }
  return user ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
