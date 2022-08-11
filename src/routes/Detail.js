import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import WordGenerator from "../components/Generator/WordGenerator";
import { WordList } from "../components/Lists/WordList";
import { TopicDataContext } from "../context/TopicDataContext";

function Detail({ topics }) {
  const { topic } = useParams();
  const [itemLoading, setitemLoading] = useState(false);

  if (!topics.find((_topic) => _topic.topic === topic)) {
    return <div>잘못된 페이지</div>;
  }

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
