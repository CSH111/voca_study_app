import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import WordGenerator from "../components/Generator/WordGenerator";
import { WordList } from "../components/Lists/WordList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";
import { useEffect } from "react";
import axios from "axios";

function Detail({ setMsg }) {
  const { topic } = useParams();
  const [itemLoading, setitemLoading] = useState(false);
  const [topicID, setTopicID] = useState("");
  const navigate = useNavigate();
  const isBookmarkList = topic === "bookmark" ? true : false;
  useEffect(() => {
    setMsg(topic);
  }, []);

  useEffect(() => {
    if (topic === "bookmark") return;
    axios
      .get("/api/topic") //
      .then((res) => {
        const topicData = res.data.topics.find(
          (_topic) => _topic.topicName === topic
        );
        setTopicID(topicData._id);
      });
  }, []);

  return (
    <>
      {!isBookmarkList && (
        <WordGenerator
          topic={topic}
          topicID={topicID}
          setitemLoading={setitemLoading}
        />
      )}
      <hr />
      <Button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={["fas", "undo"]} />
      </Button>
      <WordList
        topic={topic}
        itemLoading={itemLoading}
        isBookmarkList={isBookmarkList}
      />
    </>
  );
}

export default Detail;
