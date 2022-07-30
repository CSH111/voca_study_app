import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Wordrow } from "./WordRow";

export function WordsList({ topic, updateState }) {
  const [words, setWords] = useState([]);
  const [modifyingUpdate, setModifyingUpdate] = useState(false);
  const changeModifyingState = () => {
    setModifyingUpdate(!modifyingUpdate);
  };
  useEffect(() => {
    fetch(`http://localhost:3001/words?topic=${topic}`)
      .then((response) => response.json())
      .then((data) => setWords(data));
  }, [updateState, modifyingUpdate]);
  return (
    <table>
      <tbody>
        {words.map((word) => (
          <Wordrow word={word} key={word.id} onUpdate={changeModifyingState} />
        ))}
      </tbody>
    </table>
  );
}
