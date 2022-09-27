import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import WordGenerator from "../components/Generator/WordGenerator";
import WordList from "../components/Lists/WordList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";
import { useEffect } from "react";
import axios from "axios";

function Detail({ setMsg }) {
  const { topic } = useParams();
  const [itemLoading, setitemLoading] = useState(false);
  const [topicID, setTopicID] = useState("");
  const [wordItemLoading, setwordItemLoading] = useState(false);
  const navigate = useNavigate();
  const isBookmarkList = topic === "bookmark" ? true : false;
  useEffect(() => {
    setMsg(topic);
  }, []);

  useEffect(() => {
    if (topic === "bookmark") return;
    axios
      .get("/api/topic") // 쿼리문 topic?topicName=xxx 로 다시만들기 -> 바디줄이기의 일환
      .then((res) => {
        const topicData = res.data.topics.find(
          (_topic) => _topic.topicName === topic
        );
        setTopicID(topicData._id);
      });
  }, []);

  return (
    <>
      {topic !== "bookmark" && (
        <WordGenerator
          topic={topic}
          topicID={topicID}
          setwordItemLoading={setwordItemLoading}
          // setitemLoading={setitemLoading}
        />
      )}
      <hr />
      <Button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={["fas", "undo"]} />
      </Button>
      <WordList topic={topic} wordItemLoading={wordItemLoading} />
    </>
  );
}

export default Detail;
