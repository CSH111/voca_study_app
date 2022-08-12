import { useContext, useEffect, useState } from "react";

import { WordsDataContext } from "../../context/WordsDataContext";
import Loading from "../Loading";
import { WordListItem } from "./WordListItem";

export function WordList({ topic, itemLoading }) {
  const { words, setWords } = useContext(WordsDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/words?topic=${topic}`)
      .then((res) => res.json())
      .then((data) => {
        setWords(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (!words.length && !itemLoading) {
    return <div>단어를 추가하세요.</div>;
  }
  return (
    <table>
      <tbody>
        {words.map((word) => (
          <WordListItem word={word} key={word.id} />
        ))}
        <tr>
          <td colSpan={6}>{itemLoading ? "loading..." : null}</td>
        </tr>
      </tbody>
    </table>
  );
}
