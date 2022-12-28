import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const MainLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Body>
        <StyledOutlet />
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Body = styled.div`
  align-self: center;
  flex: 1;
  width: 80%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    width: 95%;
  }
`;

const StyledOutlet = styled(Outlet)``;
export default MainLayout;
