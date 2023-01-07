import { Link as RRDLink } from "react-router-dom";
import styled from "styled-components";

export const Link = styled(RRDLink)`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 10px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 10px;
  > *:first-child {
    flex: 0 0 25px;
  }
`;
