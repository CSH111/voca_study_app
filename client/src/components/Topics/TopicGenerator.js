import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button } from "../../components/common";
import { langCode as LC } from "../../constants";
import { useModal, useWordbookSelector } from "../../context";
import { usePostTopic } from "../../hooks";
import { Form, Input, Select } from "../common/Form";
import { AddIcon } from "../common/icons";
import UnderLinedInput from "../common/UnderLinedInput";

const TopicGenerator = () => {
  const { topics } = useWordbookSelector();
  const { postTopic, isLoading } = usePostTopic();
  const topicInputRef = useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { closeModal } = useModal();

  useEffect(() => {
    topicInputRef.current.focus();
  }, []);

  const isDuplicated = (_topicValue) => {
    const topicNames = topics.map((topic) => topic.topicName);
    if (topicNames.includes(_topicValue)) {
      return true;
    }
    return false;
  };

  const handleSubmit = ({ topicName, lang }) => {
    const trimedTopicName = topicName.value.trim();
    if (isDuplicated(trimedTopicName)) {
      setMsg("중복된 이름입니다.");
      return;
    }
    if (trimedTopicName === "bookmark") {
      setMsg("사용할 수 없는 이름입니다.");
      return;
    }

    postTopic(trimedTopicName, lang.value).then(() => {
      closeModal();
      navigate(`/topics/${trimedTopicName}`);
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Select name="lang" defaultValue={LC.USA}>
        <option value={LC.USA}>영어</option>
        <option value={LC.JAPAN}>일본어</option>
        <option value={LC.CHINA}>중국어</option>
      </Select>
      <div>
        <StyledInput name="topicName" required ref={topicInputRef} />
        <Button disabled={isLoading} height="35px" width="35px">
          <AddIcon />
        </Button>
      </div>
      <MsgBox>{msg}</MsgBox>
    </StyledForm>
  );
};

export default TopicGenerator;

const StyledInput = styled(Input)`
  ${UnderLinedInput.componentStyle.rules}
`;

const StyledForm = styled(Form)`
  margin: 0 auto;
  > div {
    display: flex;
    button {
      margin-left: 5px;
    }
  }

  select {
    margin-bottom: 5px;
  }
`;
const MsgBox = styled.div`
  min-height: 50px;
  margin-top: 10px;
  color: ${(p) => p.theme.color.error.main};
  font-size: 14px;
`;
