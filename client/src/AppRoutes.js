import { Navigate, Route, Routes } from "react-router-dom";

import { MainLayout } from "./components/layout";
import { Bookmark, Home, Login, Register, Study, Topics, Words } from "./pages";
import { PrivateRoutes, PublicRoutes } from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topic" element={<Words />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/test/:topic" element={<Study />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
