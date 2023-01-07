import styled from "styled-components";

const EmptyMsgBox = ({ children }) => {
  return (
    <StyledBox>
      <p>{children}</p>
    </StyledBox>
  );
};

export default EmptyMsgBox;

const StyledBox = styled.div`
  font-size: 20px;
  margin-top: 30px;
`;
