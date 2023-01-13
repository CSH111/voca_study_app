import styled from "styled-components";

import Button from "./Button";

const AuthButton = ({ children, onClick, ...rest }) => {
  return (
    <StyledButton {...rest} onClick={onClick} variant="contained" themeColor="primary" angleBorder>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  font-size: 16px;
  padding: 10px;
`;
export default AuthButton;
