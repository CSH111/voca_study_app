import { Navigate, Outlet } from "react-router-dom";

import { LoadingCover } from "../components/common";
import { useAuthSeletor } from "../context";

const PrivateRoutes = () => {
  const { user, isLoading } = useAuthSeletor();

  if (isLoading) {
    return <LoadingCover />;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoutes;
