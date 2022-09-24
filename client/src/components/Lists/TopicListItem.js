import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import ProgressBar from "../ProgressBar";
import Ellipsis from "../Ellipsis";
import styled from "styled-components";
import ListItem from "./ListItem";
import InputBox from "../InputBox";
import { useRef } from "react";
import axios from "axios";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  h3 {
    margin-right: 0.5rem;
  }
`;
const StyledForm = styled.form``;

const TopicListItem = ({ topic }) => {
  const { topics, setTopics } = useContext(DataContext);
  const [isModifying, setIsModifying] = useState(false);
  const [wordsAmount, setWordsAmount] = useState("");
  const [wordsDoneAmount, setWordsDoneAmount] = useState("");
  const [topicValue, setTopicValue] = useState(topic.topicName);
  const [topicItemLoading, setTopicItemLoading] = useState(false);
  const modifyingValue = useRef();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    if (!window.confirm("삭제할꺼?")) {
      return;
    }
    axios
      .delete(`/api/topic/${topic._id}`, { data: { topic: topic.topicName } }) //
      .then((res) => {
        setIsDeleted(true);
      })
      .catch(console.log);
  };

  const handleTopicInput = (e) => {
    setTopicValue(e.target.value);
  };

  const handleModificationMode = () => {
    setIsModifying(true);
    setTimeout(() => {
      modifyingValue.current.focus();
    }, 0);
  };

  const getUpdatedTopics = (newTopicObject) => {
    return topics.map((_topic) => {
      if (_topic._id === topic._id) {
        return { ...topic, ...newTopicObject };
      }
      return _topic;
    });
  };

  const updateTopic = () => {
    const body = { topicName: topicValue };
    return axios
      .patch(`/api/topic/${topic._id}`, body) //
      .then(() => {
        setTopics(getUpdatedTopics(body));
      })
      .catch(console.log);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setIsModifying(false);
    setTopicItemLoading(true);
    updateTopic() //
      .finally(() => setTopicItemLoading(false));
  };

  if (topicItemLoading) {
    return <ListItem>loading...</ListItem>;
  }
  if (isDeleted) {
    return null;
  }
  return (
    <ListItem className="topic">
      {isModifying && (
        <StyledForm isModifying={isModifying}>
          <InputBox
            type="text"
            value={topicValue}
            onChange={handleTopicInput}
            ref={modifyingValue}
          />
          <Button onClick={handleSubmission}>끝</Button>
        </StyledForm>
      )}
      {!isModifying && (
        <StyledDiv isModifying={isModifying}>
          <h3>
            <Link to={`/${topic.topicName}`}>{topic.topicName}</Link>
          </h3>
          {/* <ProgressBar
            progress={
              wordsDoneAmount / wordsAmount !== NaN
                ? wordsDoneAmount / wordsAmount
                : 0
            }
            innerText={wordsAmount ? wordsDoneAmount + "/" + wordsAmount : null}
          /> */}
        </StyledDiv>
      )}

      <Ellipsis
        items={
          <>
            <Button onClick={handleDelete}>
              <FontAwesomeIcon icon={["fas", "trash-alt"]} />
            </Button>
            <Button onClick={handleModificationMode}>
              <FontAwesomeIcon icon={["fas", "edit"]} />
            </Button>
          </>
        }
      />
    </ListItem>
  );

  //
  // return (
  //   <ListItem className="topic">
  //     <StyledForm isModifying={isModifying}>
  //       <InputBox
  //         type="text"
  //         value={topicValue}
  //         onChange={handleTopicInput}
  //         ref={modifyingValue}
  //       />
  //       <Button onClick={onModifyBtnClick}>끝</Button>
  //     </StyledForm>
  //     <StyledDiv isModifying={isModifying}>
  //       <h3>
  //         <Link to={`/${topic.topic}`}>{topic.topic}</Link>
  //       </h3>
  //       <ProgressBar
  //         progress={
  //           wordsDoneAmount / wordsAmount !== NaN
  //             ? wordsDoneAmount / wordsAmount
  //             : 0
  //         }
  //         innerText={wordsAmount ? wordsDoneAmount + "/" + wordsAmount : null}
  //       />
  //     </StyledDiv>
  //     <Ellipsis
  //       items={
  //         <>
  //           <Button onClick={onDeleteBtnCLick}>
  //             <FontAwesomeIcon icon={["fas", "trash-alt"]} />
  //           </Button>
  //           <Button onClick={() => goModifying()}>
  //             <FontAwesomeIcon icon={["fas", "edit"]} />
  //           </Button>
  //         </>
  //       }
  //     />
  //   </ListItem>
  // );
};
export default TopicListItem;
