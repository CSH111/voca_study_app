import styled from "styled-components";

const EmptyMsgBox = ({ children }) => {
  return (
    <StyledBox>
      <Msg>{children}</Msg>
    </StyledBox>
  );
};

export default EmptyMsgBox;

const StyledBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-bottom: 20%; */
`;
const Msg = styled.p`
  width: 90%;
  max-width: 400px;
  min-height: 80px;
  background-color: ${(p) => p.theme.color.primary.main};
  color: ${(p) => p.theme.color.secondary.main};
  border-radius: 10px;
  font-size: 20px;
  padding: 15px;
  line-height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
