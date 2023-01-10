import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";

import MainLayout from "./components/layout/MainLayout";
import { ModalProvider } from "./context";
import { Bookmark, Home, Login, Register, Study, Topics, Words } from "./pages";
import { PrivateRoutes, PublicRoutes } from "./routes";

const AppRouter = () => {
  return (
    <Router>
      <ModalProvider>
        <Reset />
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
      </ModalProvider>
    </Router>
  );
};

export default AppRouter;
