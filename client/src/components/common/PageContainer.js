import styled from "styled-components";

const PageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: ${({ align }) => align ?? "center"};
`;

export default PageContainer;
