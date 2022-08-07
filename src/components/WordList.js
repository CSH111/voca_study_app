import { useContext, useEffect, useState } from "react";
import { WordsDataContext } from "../context/WordsDataContext";
import { WordListItem } from "./WordListItem";

export function WordList({ topic }) {
  const { words, setWords } = useContext(WordsDataContext);

  useEffect(() => {
    console.log("fetched");
    fetch(`http://localhost:3001/words?topic=${topic}`)
      .then((res) => res.json())
      .then((data) => {
        setWords(data);
      });
  }, []);

  return (
    <table>
      <tbody>
        {words.map((word) => (
          <WordListItem word={word} key={word.id} />
        ))}
      </tbody>
    </table>
  );
}
