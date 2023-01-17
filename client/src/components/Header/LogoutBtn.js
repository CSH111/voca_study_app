import { Button } from "../common";

const LogoutBtn = ({ children, onClick, ...rest }) => {
  return (
    <Button {...rest} fontSize="16px" themeColor="primary" onClick={onClick} variant="contained">
      {children}
    </Button>
  );
};

export default LogoutBtn;
