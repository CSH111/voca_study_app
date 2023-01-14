import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

const Link = ({ to, children, margin }) => {
  return (
    <StyledLink to={to} margin={margin}>
      {children}
    </StyledLink>
  );
};

export default Link;

const StyledLink = styled(RouterLink)`
  font-size: 14px;
  transition: all 0.15s;
  padding: 8px 16px;
  border-radius: 5px;
  margin: ${(p) => p.margin ?? "auto"};
  &:hover {
    background-color: ${(p) => p.theme.color.primary.main};
    color: ${(p) => p.theme.fontColor.secondary.main};
  }
`;
