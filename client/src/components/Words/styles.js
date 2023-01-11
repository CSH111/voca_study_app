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
  @media (max-width: 650px) {
    flex-direction: column;
    > *:not(:last-child) {
      margin-bottom: 5px;
    }
  }
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

export const Form = styled.form`
  &.generator {
    align-self: flex-end;
    margin: 10px 0;
  }

  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: 5px;
  }
  @media (max-width: 650px) {
    > *:last-child {
      align-self: flex-end;
    }
  }

  @media (max-width: 400px) {
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
