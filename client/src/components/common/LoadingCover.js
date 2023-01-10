import styled from "styled-components";

import { Spinner } from "./icons";
import RootPortal from "./RootPortal";

const LoadingCover = () => {
  return (
    <RootPortal>
      <Container>
        <Spinner />
      </Container>
    </RootPortal>
  );
};

export default LoadingCover;

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: #9f9f9f62;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    /* margin: 0 auto; */
    font-size: 50px;
    position: relative;
  }
`;
