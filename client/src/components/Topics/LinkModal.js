import { Link } from "react-router-dom";
import styled from "styled-components";
import { EditIcon, StudyIcon } from "../common/icons";
import Modal from "../common/Modal";

const LinkModal = ({ isOpen, setIsOpen, leftLink, rightLink }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <StyledModalContents>
        <StyledLinkBtn to={leftLink}>
          <StudyIcon fontSize="45px" />
          <div>학습하기</div>
        </StyledLinkBtn>
        <StyledLinkBtn to={rightLink}>
          <EditIcon fontSize="40px" />
          <div>편집하기</div>
        </StyledLinkBtn>
      </StyledModalContents>
    </Modal>
  );
};

export default LinkModal;

const StyledModalContents = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  align-items: stretch;
`;

const StyledLinkBtn = styled(Link)`
  flex: 1;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 0px gray;
  background-color: #d1d1d1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  font-weight: bold;
  font-size: 18px;
  transition: all 0.15s;
  &:hover {
    background-color: #979797;
  }
`;