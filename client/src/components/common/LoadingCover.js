import styled from "styled-components";

import { Spinner } from "./icons";
import RootPortal from "./RootPortal";

const LoadingCover = ({ transparent }) => {
  return (
    <RootPortal>
      <Container transparent={transparent}>
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
  background-color: ${(p) => (p.transparent ? p.theme.color.gray.trans : p.theme.color.gray.light)};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    /* margin: 0 auto; */
    font-size: 50px;
    position: relative;
  }
`;
