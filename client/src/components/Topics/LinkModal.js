import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useModal } from "../../context";
import { Button, Modal } from "../common";
import { EditIcon, StudyIcon } from "../common/icons";

const LinkModal = ({ leftLink, rightLink, title, wordsAmount }) => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const handleLeftBtnClick = () => {
    navigate(leftLink);
    closeModal();
  };
  const handleRightBtnClick = () => {
    navigate(rightLink);
    closeModal();
  };
  return (
    <Modal title={title}>
      <StyledModalContents>
        <StyledButton
          propagation
          onClick={handleLeftBtnClick}
          variant="contained"
          themeColor="primary"
          shadow
          disabled={!wordsAmount}
        >
          <StudyIcon fontSize="45px" />
          <div className="link-name">학습하기</div>
        </StyledButton>
        <StyledButton
          propagation
          onClick={handleRightBtnClick}
          variant="contained"
          themeColor="primary"
          shadow
        >
          <EditIcon fontSize="45px" />
          <div className="link-name">편집하기</div>
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
  font-size: 18px;
  transition: all 0.15s;
  position: relative;
  > *:not(:last-child) {
    margin-bottom: 10px;
  }
  .link-name {
    color: inherit;
  }
`;
