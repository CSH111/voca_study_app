import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import WordGenerator from "../components/Generator/WordGenerator";
import { WordList } from "../components/Lists/WordList";
import BookmarkList from "../components/Lists/BookmarkList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";
import styled from "styled-components";
import { useEffect } from "react";
import axios from "axios";

function Detail({ setMsg }) {
  const { topic } = useParams();
  const [itemLoading, setitemLoading] = useState(false);
  const [testWords, setTestWords] = useState([]);
  const [topicID, setTopicID] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    setMsg(topic);
  }, []);

  useEffect(() => {
    axios
      .get("/api/topic") //
      .then((res) => {
        const topicData = res.data.topics.find(
          (_topic) => _topic.topicName === topic
        );
        setTopicID(topicData._id);
      });
  }, []);

  if (topic !== "bookmark") {
    return (
      <>
        <WordGenerator
          topic={topic}
          topicID={topicID}
          setitemLoading={setitemLoading}
          setTestWords={setTestWords}
          testWords={testWords}
        />
        <hr />
        <Button onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={["fas", "undo"]} />
        </Button>
        <WordList
          topic={topic}
          itemLoading={itemLoading}
          setTestWords={setTestWords}
          testWords={testWords}
        />
      </>
    );
  }
  return (
    <>
      <hr />
      <Button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={["fas", "undo"]} />
      </Button>{" "}
      <BookmarkList />
    </>
  );
}

export default Detail;
