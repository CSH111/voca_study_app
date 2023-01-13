import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

const Link = ({ to, children }) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default Link;

//TODO hover시 글자 바꾸기
const StyledLink = styled(RouterLink)`
  font-size: 14px;
  transition: all 0.15s;
  padding: 8px 16px;
  border-radius: 5px;
  &:hover {
    background-color: ${(p) => p.theme.color.primary.main};
    color: ${(p) => p.theme.fontColor.secondary.main};
  }
`;
