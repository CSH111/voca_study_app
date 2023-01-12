import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Header } from "../Header";

const MainLayout = () => {
  return (
    <Wrapper>
      <HeaderArea>
        <Header />
      </HeaderArea>
      <Body>
        <StyledOutlet />
      </Body>
    </Wrapper>
  );
};

const HeaderArea = styled.div``;

const Wrapper = styled.div`
  min-height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Body = styled.div`
  align-self: center;
  height: 0;
  flex: 1;
  width: 80%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const StyledOutlet = styled(Outlet)``;

export default MainLayout;
