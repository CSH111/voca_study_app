import styled from "styled-components";

const StudyRestult = styled.div`
  > div {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
    &.complete {
      color: #309234;
    }
    &.incomplete {
      color: #f04040;
    }
  }
`;

export default StudyRestult;
