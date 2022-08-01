import { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../context/UpdateContext";
import { Wordrow } from "./WordRow";

export function WordsList({ topic }) {
  const [words, setWords] = useState([]);
  const { updateState } = useContext(UpdateContext);

  useEffect(() => {
    fetch(`http://localhost:3001/words?topic=${topic}`)
      .then((response) => response.json())
      .then((data) => setWords(data));
  }, [updateState]);
  return (
    <table>
      <tbody>
        {words.map((word) => (
          <Wordrow word={word} key={word.id} />
        ))}
      </tbody>
    </table>
  );
}
