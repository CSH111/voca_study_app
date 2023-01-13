import { Button } from "../common";

const LogoutBtn = ({ children, onClick }) => {
  return (
    <Button fontSize="16px" themeColor="primary" onClick={onClick} variant="contained">
      {children}
    </Button>
  );
};

export default LogoutBtn;
