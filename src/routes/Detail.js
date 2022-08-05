import { useParams } from "react-router-dom";
import WordGenerator from "../components/WordGenerator";
import { WordList } from "../components/WordList";

function Detail() {
  const { topic } = useParams();

  return (
    <>
      <h2>{topic}</h2>
      <WordGenerator topic={topic} />
      <hr />
      <WordList topic={topic} />
    </>
  );
}

export default Detail;
