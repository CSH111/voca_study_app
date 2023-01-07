import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import { Bookmark, Home, Login, Register, Study, Topics, Words } from "./pages";
import MainLayout from "./components/layout/MainLayout";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { Reset } from "styled-reset";
import { ModalProvider } from "./context";

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
