import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TopicDataContext } from "../../context/TopicDataContext";
import putData from "../../function/putData";
import makeNewContextData from "../../function/makeNewContextData";
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
  const { topics, setTopics } = useContext(TopicDataContext);
  const [isModifying, setIsModifying] = useState(false);
  const [wordsAmount, setWordsAmount] = useState("");
  const [wordsDoneAmount, setWordsDoneAmount] = useState("");
  const [topicValue, setTopicValue] = useState(topic.topicName);
  const [loading, setLoading] = useState(false);
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
    console.dir(modifyingValue.current);
    setTimeout(() => {
      modifyingValue.current.focus();
    }, 0);
  };
  // const modifyWords = () => {
  //   return fetch(`http://localhost:3001/words?topic=${topic.topic}`)
  //     .then((response) => response.json())
  //     .then((words) =>
  //       words.forEach((word) => {
  //         putData(`http://localhost:3001/words/${word.id}`, {
  //           ...word,
  //           topic: topicValue,
  //         });
  //       })
  //     );
  // };
  // const modifyTopic = () => {
  //   putData(`http://localhost:3001/topics/${topic.id}`, {
  //     ...topic,
  //     topic: topicValue,
  //   });
  //   const updatedTopics = makeNewContextData(topics, topic, {
  //     topic: topicValue,
  //   });
  //   setTopics(updatedTopics);
  // };

  const handleSubmission = (e) => {
    e.preventDefault();
    setIsModifying(false);
    setLoading(true);
    const body = { topicName: topicValue };
    axios
      .patch(`/api/topic/${topic._id}`, body) //
      .then((res) => console.log(res.data));
  };

  if (loading) {
    return <ListItem>loading...</ListItem>;
  }
  if (isDeleted) {
    return null;
  }
  return (
    <ListItem className="topic">
      {isModifying ? (
        <StyledForm isModifying={isModifying}>
          <InputBox
            type="text"
            value={topicValue}
            onChange={handleTopicInput}
            ref={modifyingValue}
          />
          <Button onClick={handleSubmission}>끝</Button>
        </StyledForm>
      ) : (
        <StyledDiv isModifying={isModifying}>
          <h3>
            <Link to={`/${topic.topicName}`}>{topic.topicName}</Link>
          </h3>
          <ProgressBar
            progress={
              wordsDoneAmount / wordsAmount !== NaN
                ? wordsDoneAmount / wordsAmount
                : 0
            }
            innerText={wordsAmount ? wordsDoneAmount + "/" + wordsAmount : null}
          />
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
