import { Link as RRDLink } from "react-router-dom";
import styled from "styled-components";

import { Select as SelectOrigin } from "../common/Form";
export const Link = styled(RRDLink)`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 10px;
`;

export const Select = styled(SelectOrigin)`
  cursor: pointer;
  font-size: 16px;
  width: 120px;
  height: 30px;
  padding: 5px;
`;
