import styled from "styled-components";

import Modal from "./Modal";

const ErrorModal = () => {
  const handleClose = () => {
    window.location.reload();
  };
  return (
    <Modal title={"업데이트 실패"} onClose={handleClose}>
      <Contents>
        <p>페이지를 재시작합니다.</p>
      </Contents>
    </Modal>
  );
};

export default ErrorModal;

const Contents = styled.div``;
