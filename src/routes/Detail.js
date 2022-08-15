import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WordGenerator from "../components/Generator/WordGenerator";
import { WordList } from "../components/Lists/WordList";
import BookmarkList from "../components/Lists/BookmarkList";

function Detail() {
  const { topic } = useParams();
  const [itemLoading, setitemLoading] = useState(false);
  const [isValidRoute, setIsValidRoute] = useState(true);

  if (topic !== "bookmark") {
    return (
      <>
        <h2>{topic}</h2>
        <WordGenerator topic={topic} setitemLoading={setitemLoading} />
        <hr />
        <WordList topic={topic} itemLoading={itemLoading} />
      </>
    );
  }
  return (
    <>
      <h2>{topic}</h2>
      <hr />
      <BookmarkList />
    </>
  );
}

export default Detail;
