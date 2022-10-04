import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import WordGenerator from "../components/Words/WordGenerator";
import WordList from "../components/Words/WordList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/common/Button";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Words() {
  const params = useParams();
  const topic = params.topic;
  const store = useContext(DataContext);
  const [topicID, setTopicID] = useState("");
  const [wordItemLoading, setwordItemLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    store.setParams(params);
    return () => store.setParams({});
  }, []);

  useEffect(() => {
    const currTopicID = store.topicsData.topics.find(
      (_topic) => _topic.topicName === topic
    )?._id;
    setTopicID(currTopicID);
  }, []);

  return (
    <>
      <WordGenerator
        topic={topic}
        topicID={topicID}
        setwordItemLoading={setwordItemLoading}
      />
      <hr />
      <Button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" />
      </Button>
      <WordList topic={topic} wordItemLoading={wordItemLoading} />
    </>
  );
}

export default Words;
