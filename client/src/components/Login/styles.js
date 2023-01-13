import styled from "styled-components";

import { RectangularButton } from "../common";
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
`;

export const Button = styled(RectangularButton)`
  margin-top: 10px;
`;

export const Msg = styled.p`
  min-height: 25px;
  color: ${(p) => p.theme.color.error.main};
  font-weight: bold;
`;
