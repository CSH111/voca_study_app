import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../services/Auth/hooks/useAuthContext";

const PrivateRoutes = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
