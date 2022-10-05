import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  background-color: #e1e2e1;
`;

const MainLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export default MainLayout;
