import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import WordGenerator from "../components/Generator/WordGenerator";
import { WordList } from "../components/Lists/WordList";
import BookmarkList from "../components/Lists/BookmarkList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";
import styled from "styled-components";
import { useEffect } from "react";

function Detail({ setMsg }) {
  const { topic } = useParams();
  const [itemLoading, setitemLoading] = useState(false);
  const [testWords, setTestWords] = useState([]);

  useEffect(() => {
    if (topic !== "bookmark") {
      fetch(`http://localhost:3001/words?topic=${topic}`)
        .then((res) => res.json())
        .then((data) => {
          setTestWords(data);
        });
    }
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    setMsg(topic);
  }, []);

  if (topic !== "bookmark") {
    return (
      <>
        <WordGenerator
          topic={topic}
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
