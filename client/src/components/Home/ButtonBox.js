import styled from "styled-components";

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  > button:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

export default ButtonBox;
