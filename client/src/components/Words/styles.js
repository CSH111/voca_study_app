import styled, { css } from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    font-size: 12px;
  }
`;

export const Controls = styled.div`
  display: flex;
  > *:not(:last-child) {
    margin-right: 10px;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    > *:not(:last-child) {
      margin-bottom: 5px;
    }
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const Form = styled.form`
  &.generator {
    margin-bottom: 25px;
  }
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  > *:not(:last-child) {
    margin-right: 5px;
  }
  @media (max-width: 700px) {
    > *:last-child {
      align-self: flex-end;
    }
  }

  @media (max-width: 500px) {
    ${({ columnOnSmallDevice }) =>
      columnOnSmallDevice &&
      css`
        flex-direction: column;
        > *:last-child {
          align-self: flex-end;
          margin: 5px 0;
        }
      `}
  }
`;
