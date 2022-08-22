import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import WordGenerator from "../components/Generator/WordGenerator";
import { WordList } from "../components/Lists/WordList";
import BookmarkList from "../components/Lists/BookmarkList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";

function Detail() {
  const { topic } = useParams();
  const [itemLoading, setitemLoading] = useState(false);
  const navigate = useNavigate();

  if (topic !== "bookmark") {
    return (
      <>
        <h2>{topic}</h2>
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
      <h2>{topic}</h2>
      <hr />
      <Button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={["fas", "undo"]} />
      </Button>
      <BookmarkList />
    </>
  );
}

export default Detail;
