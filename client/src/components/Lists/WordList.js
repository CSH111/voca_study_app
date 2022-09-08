import { useContext, useEffect, useState } from "react";

import { WordsDataContext } from "../../context/WordsDataContext";
import Loading from "../Loading";
import { WordListItem } from "./WordListItem";

import List from "./List";
import axios from "axios";
export function WordList({ topic, itemLoading }) {
  const { words, setWords } = useContext(WordsDataContext);
  const [loading, setLoading] = useState(true);
  //컨텍스트의 words를 쓰지말고 그냥 이 컴포넌트의 words에 최초 fetch시 추가시키고 단어 추가시 words에 추가하기...(데이터는 따로)
  // useEffect(() => {
  //   fetch(`http://localhost:3001/words?topic=${topic}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setWords(data);
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
    const body = { topic };
    axios
      .post("/api/data/word/read", body) //
      .then((res) => {
        setWords(res.data.words);
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
    <List>
      {words.map((word) => (
        <WordListItem word={word} key={word._id} />
      ))}

      <li>{itemLoading ? "loading..." : null}</li>
    </List>
  );
}
