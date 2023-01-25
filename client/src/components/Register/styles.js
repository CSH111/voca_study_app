import styled, { css } from "styled-components";

import { Form as OriginalForm, Input as OriginalInput } from "../common/Form";

export const Form = styled(OriginalForm)`
  display: flex;
  flex-direction: column;
`;
export const Input = styled(OriginalInput)`
  margin-bottom: 15px;
  height: 40px;
`;
export const Label = styled.label`
  margin-bottom: 10px;
  /* line-break: strict; */
  word-break: keep-all;
  white-space: nowrap;
  ${(p) =>
    p.required &&
    css`
      &::after {
        content: " *";
      }
    `}
`;

export const LabelAndMsgBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ValidityMsg = styled.div`
  font-size: 13px;
  margin: 5px;
  color: ${(p) => p.theme.color.error.main};
`;

export const ResultMsg = styled.p`
  min-height: 35px;
  color: ${(p) => p.theme.color.error.main};
  font-weight: bold;
`;
