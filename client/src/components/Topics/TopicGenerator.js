import { useContext, useRef, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputBox from "../common/InputBox";
import axios from "axios";

const StyledForm = styled.form``;
const TopicGenerator = function ({ setItemLoading }) {
  const [topicValue, setTopicValue] = useState("");
  const store = useContext(DataContext);
  const topicInput = useRef();
  const navigate = useNavigate();
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
  //

  const isEmpty = (_topicValue) => {
    if (!_topicValue.trim()) {
      alert("공백을 입력할 수 없습니다.");
      return true;
    }
    return false;
  };

  const isDuplicated = (_topicValue) => {
    const topicNames = store.topics.map((topic) => topic.topicName);
    if (topicNames.includes(_topicValue)) {
      alert("중복된 토픽입니다.");
      return true;
    }
    return false;
  };

  const isInValidTopicName = (_topicValue) => {
    if (isEmpty(_topicValue) || isDuplicated(_topicValue)) {
      return true;
    }
    return false;
  };

  const handleTopicCreate = (e) => {
    e.preventDefault();
    if (isInValidTopicName(topicValue)) return;
    setItemLoading(true);
    setIsSubmitBtnDisabled(true);
    const body = { topicName: topicValue };
    axios
      .post("/api/topic", body) //
      .then((res) => {
        setTopicValue("");
        store.setTopics(res.data.topics);
        setItemLoading(false);
        navigate(`/${topicValue}`);
      })
      .catch(console.log);
  };

  return (
    <StyledForm>
      <label>
        주제
        <InputBox
          type="text"
          value={topicValue}
          onChange={(e) => setTopicValue(e.target.value)}
          ref={topicInput}
        />
      </label>

      <Button onClick={handleTopicCreate} disabled={isSubmitBtnDisabled}>
        <FontAwesomeIcon icon="fa-solid fa-plus" />
      </Button>
    </StyledForm>
  );
};

export default TopicGenerator;
