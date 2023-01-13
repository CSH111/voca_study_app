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
  & .topic-data {
    /* flex: 1; */
    /* width: 200px; */
    margin-left: 10px;
    display: flex;
    align-items: center;
    > *:not(:last-child) {
      margin-right: 5px;
    }
    h3:not(:last-child) {
      margin-right: 10px;
    }
    h3 {
      flex: 1;
      width: 50%;
      /* display: inline; */
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;
