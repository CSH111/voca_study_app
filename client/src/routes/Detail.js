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
  const navigate = useNavigate();
  useEffect(() => {
    setMsg(topic);
  }, []);

  if (topic !== "bookmark") {
    return (
      <>
        <WordGenerator topic={topic} setitemLoading={setitemLoading} />
        <hr />
        <Button onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={["fas", "undo"]} />
        </Button>
        <WordList topic={topic} itemLoading={itemLoading} />
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
