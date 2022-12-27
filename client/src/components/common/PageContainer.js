import styled from "styled-components";

const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ align }) => align ?? "center"};
`;

export default PageContainer;
