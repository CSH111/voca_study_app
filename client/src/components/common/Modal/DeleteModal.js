import styled from "styled-components";

import { useModal } from "../../../context";
import { Button, Modal } from "../";

const DeleteModal = ({ msg, handleDelete, title }) => {
  const { closeModal } = useModal();

  const handleModalClose = () => {
    closeModal();
  };

  return (
    <Modal title={title}>
      <StyledModalContents>
        <p>{msg}</p>
        <div className="del-modal-btns-box">
          <Button themeColor="error" onClick={handleDelete} variant="contained">
            삭제
          </Button>
          <Button themeColor="primary" onClick={handleModalClose} variant="contained">
            취소
          </Button>
        </div>
      </StyledModalContents>
    </Modal>
  );
};

export default DeleteModal;

const StyledModalContents = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }
  .del-modal-btns-box {
    margin-top: 10px;
    align-self: flex-end;
    display: flex;
    button {
      font-size: 16px;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
`;
