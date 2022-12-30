import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../services/DataContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AddIcon } from "../common/icons";
import axios from "axios";
import Button from "../../components/common/Button";
import InputBox from "../../components/common/InputBox";

const TopicGenerator = function ({ setItemLoading }) {
  const [topicValue, setTopicValue] = useState("");
  const store = useContext(DataContext);
  const topicInput = useRef();
  const navigate = useNavigate();
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
  const [msg, setMsg] = useState("");

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
    const topicNames = store.topicsData.topics.map((topic) => topic.topicName);
    if (topicNames.includes(_topicValue)) {
      return true;
    }
    return false;
  };

  const handleTopicCreate = (e) => {
    e.preventDefault();
    if (isEmpty(topicValue)) {
      setMsg("공백을 입력할 수 없습니다.");
      return;
    }
    if (isDuplicated(topicValue.trim())) {
      setMsg("중복된 이름입니다.");
      return;
    }
    setItemLoading(true);
    setIsSubmitBtnDisabled(true);
    const body = { topicName: topicValue.trim() };
    axios
      .post("/api/topic", body) //
      .then((res) => {
        setTopicValue("");
        store.setTopicsData((data) => ({ ...data, topics: res.data.topics }));
        setItemLoading(false);
        navigate(`/topics/${topicValue}`);
      })
      .catch(console.log);
  };

  return (
    <StyledForm>
      <div>
        <InputBox
          type="text"
          value={topicValue}
          onChange={(e) => setTopicValue(e.target.value)}
          ref={topicInput}
          placeholder="토픽폴더를 추가하세요"
        />

        <Button
          onClick={handleTopicCreate}
          disabled={isSubmitBtnDisabled}
          height="35px"
          width="35px"
        >
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
  color: red;
  font-size: 14px;
`;
