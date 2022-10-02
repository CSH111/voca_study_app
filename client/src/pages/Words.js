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
    if (topic === "bookmark") return;
    axios
      .get("/api/topic") // 쿼리문 topic?topicName=xxx 로 다시만들기 -> 바디줄이기의 일환
      .then((res) => {
        const topicData = res.data.topics.find(
          (_topic) => _topic.topicName === topic
        );
        if (!topicData) {
          alert("잘못된 경로");
          navigate("/");
          return;
        }
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
        />
      )}
      <hr />
      <Button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" />
      </Button>
      <WordList topic={topic} wordItemLoading={wordItemLoading} />
    </>
  );
}

export default Words;
