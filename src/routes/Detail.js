import { useParams } from "react-router-dom";
import { WordsList } from "../components/WordsList";

export function Detail() {
  const { topic } = useParams();

  return (
    <>
      <h2>{topic}</h2>
      <button>단어추가</button>
      <WordsList topic={topic} />
    </>
  );
}
