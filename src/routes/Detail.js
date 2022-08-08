import { useState } from "react";
import { useParams } from "react-router-dom";
import WordGenerator from "../components/Generator/WordGenerator";
import { WordList } from "../components/Lists/WordList";

function Detail() {
  const { topic } = useParams();
  const [itemLoading, setitemLoading] = useState(false);
  return (
    <>
      <h2>{topic}</h2>
      <WordGenerator topic={topic} setitemLoading={setitemLoading} />
      <hr />
      <WordList topic={topic} itemLoading={itemLoading} />
    </>
  );
}

export default Detail;
