import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button, InputBox } from "../../components/common";
import { useModal, useWordbookSelector } from "../../context";
import { usePostTopic } from "../../hooks";
import { AddIcon } from "../common/icons";

const TopicGenerator = () => {
  const [topicValue, setTopicValue] = useState("");
  const { topics } = useWordbookSelector();
  const { postTopic, isLoading, isError } = usePostTopic();
  const topicInput = useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { closeModal } = useModal();

  const isEmpty = (_topicValue) => {
    if (!_topicValue.trim()) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    topicInput.current.focus();
  }, []);

  const isDuplicated = (_topicValue) => {
    const topicNames = topics.map((topic) => topic.topicName);
    if (topicNames.includes(_topicValue)) {
      return true;
    }
    return false;
  };

  const handleTopicCreate = async (e) => {
    e.preventDefault();
    if (isEmpty(topicValue)) {
      setMsg("공백을 입력할 수 없습니다.");
      return;
    }
    if (isDuplicated(topicValue.trim())) {
      setMsg("중복된 이름입니다.");
      return;
    }
    if (topicValue === "bookmark") {
      setMsg("사용할 수 없는 이름입니다.");
      return;
    }

    const trimedTopicName = topicValue.trim();
    //TODO catch 위치 테스트
    postTopic(trimedTopicName).then(() => {
      closeModal();
      navigate(`/topics/${trimedTopicName}`);
    });
  };

  return (
    <StyledForm>
      <div>
        <InputBox
          type="text"
          value={topicValue}
          width="200px"
          onChange={(e) => setTopicValue(e.target.value)}
          ref={topicInput}
          placeholder="토픽폴더를 추가하세요"
        />

        <Button onClick={handleTopicCreate} disabled={isLoading} height="35px" width="35px">
          <AddIcon />
        </Button>
      </div>
      <MsgBox>{msg}</MsgBox>
    </StyledForm>
  );
};

export default TopicGenerator;

const StyledForm = styled.form`
  margin: 0 auto;
  > div:first-child {
    display: flex;
    button {
      margin-left: 5px;
    }
  }
`;
const MsgBox = styled.div`
  min-height: 50px;
  margin-top: 10px;
  color: ${(p) => p.theme.color.error.main};
  font-size: 14px;
`;
