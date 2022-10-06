import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WordGenerator from "./WordGenerator";
import WordList from "./WordList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../../services/DataContext";
import Button from "../../components/common/Button";

function Words() {
  const params = useParams();
  const topic = params.topic;
  const store = useContext(DataContext);
  const [topicID, setTopicID] = useState("");
  const [wordItemLoading, setwordItemLoading] = useState(false);
  const navigate = useNavigate();

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
