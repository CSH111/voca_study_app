import { Link } from "react-router-dom";
import styled from "styled-components";

import { useModal } from "../../context";
import { Button, Modal } from "../common";
import { EditIcon, StudyIcon } from "../common/icons";

const LinkModal = ({ leftLink, rightLink, title }) => {
  const { closeModal } = useModal();

  const handleBtnClick = () => {
    closeModal();
  };

  return (
    <Modal title={title}>
      <StyledModalContents>
        <StyledButton
          propagation
          onClick={handleBtnClick}
          variant="contained"
          themeColor="primary"
          shadow
        >
          <Link to={leftLink}>
            <StudyIcon fontSize="45px" />
            <div className="link-name">학습하기</div>
          </Link>
        </StyledButton>
        <StyledButton
          propagation
          onClick={handleBtnClick}
          variant="contained"
          themeColor="primary"
          shadow
        >
          <Link to={rightLink}>
            <EditIcon fontSize="45px" />
            <div className="link-name">편집하기</div>
          </Link>
        </StyledButton>
      </StyledModalContents>
    </Modal>
  );
};

export default LinkModal;

const StyledModalContents = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const StyledButton = styled(Button)`
  flex: 1;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 15px;
  font-size: 18px;
  transition: all 0.15s;
  > a > *:not(:last-child) {
    margin-bottom: 10px;
  }
  .link-name {
    color: inherit;
  }
`;
