import styled from "styled-components";

const PageContainer = styled.div`
  flex: 1;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: ${({ align }) => align ?? "center"};
  align-items: center;
`;

export default PageContainer;
