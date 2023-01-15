import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Button, InputBox } from "../../components/common";
import { useModal, useWordbookSelector } from "../../context";
import { usePostTopic } from "../../hooks";
import { AddIcon, Spinner } from "../common/icons";

const TopicGenerator = () => {
  const [topicValue, setTopicValue] = useState("");
  const { topics } = useWordbookSelector();
  const { postTopic, isLoading, isError } = usePostTopic();
  const topicInput = useRef();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { closeModal } = useModal();

  const [langValue, setLangValue] = useState("en");

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

  const handleSubmit = async (e) => {
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
    //TODO catch 위치 테스트,
    //TODO 로딩표시
    postTopic(trimedTopicName, langValue).then(() => {
      closeModal();
      navigate(`/topics/${trimedTopicName}`);
    });

    console.log(langValue);
  };

  const handleSelectChange = (e) => {
    setLangValue(e.target.value);
  };

  //TODO form 컴포넌트 이용하기

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <select name="" id="" value={langValue} onChange={handleSelectChange}>
          <option value="en">영어</option>
          <option value="ja">일본어</option>
          <option value="zh">중국어</option>
        </select>
        <div>
          <InputBox
            type="text"
            value={topicValue}
            width="200px"
            onChange={(e) => setTopicValue(e.target.value)}
            ref={topicInput}
            placeholder="토픽폴더를 추가하세요"
          />

          <Button disabled={isLoading} height="35px" width="35px">
            <AddIcon />
          </Button>
          {isLoading && <Spinner />}
        </div>
        <MsgBox>{msg}</MsgBox>
      </StyledForm>
    </>
  );
};

export default TopicGenerator;

const StyledForm = styled.form`
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
