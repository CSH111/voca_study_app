import styled from "styled-components";
import Button from "./Button";
import Modal from "./Modal";

const DeleteModal = ({ msg, handleDelete, setIsOpen, isOpen, isLoading }) => {
  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading}>
      <StyledModalContents>
        <p>{msg}</p>
        <div className="del-modal-btns-box">
          <Button themeColor="red" onClick={handleDelete}>
            삭제
          </Button>
          <Button themeColor="gray" onClick={handleModalClose}>
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
    button {
      font-size: 16px;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
`;
