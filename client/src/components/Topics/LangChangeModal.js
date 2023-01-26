import { useRef } from "react";
import styled from "styled-components";

import { langCode as LC } from "../../constants";
import { Form } from "../common/Form";
import { ConfirmModal } from "../Header";
import * as S from "./styles";

const LangChangeModal = ({ title, topicData, patchTopic }) => {
  const { lang: currentLang, _id: id } = topicData;
  const formRef = useRef();
  const handleSubmit = (states) => {
    patchTopic(id, { lang: states.lang.value });
  };

  const handleConfirm = () => {
    formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  return (
    <ConfirmModal
      title={title}
      body={
        <StyledForm onSubmit={handleSubmit} ref={formRef}>
          <S.Select name="lang" defaultValue={currentLang}>
            <option value={LC.USA}>영어</option>
            <option value={LC.JAPAN}>일본어</option>
            <option value={LC.CHINA}>중국어</option>
          </S.Select>
        </StyledForm>
      }
      onConfirm={handleConfirm}
    />
  );
};

export default LangChangeModal;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
`;
