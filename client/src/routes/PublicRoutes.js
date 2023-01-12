import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { LoadingCover } from "../components/common";
import { authActionType as AT } from "../constants";
import { useAuthDispatch, useAuthSeletor } from "../context";

const PublicRoutes = () => {
  const { user, isLoading } = useAuthSeletor();
  const dispatch = useAuthDispatch();
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/register" || pathname === "/login";

  useEffect(() => {
    dispatch({ type: AT.CLEAR_AUTH_ERROR });
  }, [pathname]);

  return !user ? (
    <>
      <Outlet />
      {isLoading && <LoadingCover transparent={isAuthPage} />}
    </>
  ) : (
    <Navigate to="/topics" />
  );
};
export default PublicRoutes;
