import { useContext, useRef, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputBox from "../InputBox";
import axios from "axios";

const StyledForm = styled.form``;
const StyledTextInput = styled(InputBox)``;
const TopicGenerator = function ({ setItemLoading }) {
  const [topicValue, setTopicValue] = useState("");
  const store = useContext(DataContext);
  const topicInput = useRef();
  const navigate = useNavigate();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
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
    setIsSubmitDisabled(true);
    const body = { topicName: topicValue };
    axios
      .post("/api/topic", body) //
      .then(() => {
        setTopicValue("");
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

      <Button onClick={handleTopicCreate} disabled={isSubmitDisabled}>
        <FontAwesomeIcon icon={faPlus} />{" "}
      </Button>
    </StyledForm>
  );
};

export default TopicGenerator;
