import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthDispatch, useAuthSeletor } from "../context";
import { LoadingCover } from "../components/common";
import { useEffect } from "react";
import { authActionType as AT } from "../constants";

const PublicRoutes = () => {
  const { user, isLoading } = useAuthSeletor();
  const dispatch = useAuthDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch({ type: AT.CLEAR_AUTH_ERROR });
  }, [pathname]);

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
