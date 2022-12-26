import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

const Link = ({ to, children }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default Link;

const StyledLink = styled(RouterLink)`
  /* align-self: center; */
  color: #4a4a4a;
  color: black;
  font-size: 14px;
`;
