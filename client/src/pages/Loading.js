import styled from "styled-components";
import { Spinner } from "../components/common/icons";

const Loading = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 50px;
  }
`;
