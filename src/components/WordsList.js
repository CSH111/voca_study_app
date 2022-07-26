import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Wordrow } from "./WordRow";

export function WordsList({ topic }) {
  const [words, setWords] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/words?topic=${topic}`)
      .then((response) => response.json())
      .then((data) => setWords(data));
  }, []);

  return (
    <table>
      <tbody>
        {words.map((word) => (
          <Wordrow word={word} />
        ))}
      </tbody>
    </table>
  );
}
