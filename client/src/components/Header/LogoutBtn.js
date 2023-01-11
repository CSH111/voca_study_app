import { Button } from "../common";

const LogoutBtn = ({ children, onClick }) => {
  return (
    <Button fontSize="16px" themeColor="gray" onClick={onClick}>
      {children}
    </Button>
  );
};

export default LogoutBtn;
