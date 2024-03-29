import styled from "styled-components";

import { useModal } from "../../context";
import { Button, Modal } from "../common";

const ConfirmModal = ({ title, msg, onConfirm, body }) => {
  const { closeModal } = useModal();
  const handleConfirm = async () => {
    onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <Modal title={title}>
      <Contents>
        <p>{msg}</p>
        {body}
        <div className="buttons-box">
          <Button themeColor="info" fontSize="16px" onClick={handleConfirm} variant="contained">
            확인
          </Button>
          <Button themeColor="primary" fontSize="16px" onClick={handleCancel} variant="contained">
            취소
          </Button>
        </div>
      </Contents>
    </Modal>
  );
};

export default ConfirmModal;

const Contents = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-weight: bold;
    font-size: 18px;
  }
  .buttons-box {
    display: flex;
    align-self: flex-end;
    & :not(:last-child) {
      margin-right: 5px;
    }
  }
`;
