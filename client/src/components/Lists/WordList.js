import { useContext, useEffect, useState } from "react";

import { WordsDataContext } from "../../context/WordsDataContext";
import Loading from "../Loading";
import { WordListItem } from "./WordListItem";

import List from "./List";
import axios from "axios";

export function WordList({ topic, itemLoading, isBookmarkList }) {
  const { words, setWords } = useContext(WordsDataContext);
  const [loading, setLoading] = useState(true);
  // const isTopicBookmark =
  useEffect(() => {
    if (!isBookmarkList) {
      axios
        .get(`/api/word?topic=${topic}`) //
        .then((res) => {
          setWords(res.data.words);
          setLoading(false);
        });
      return;
    }
    axios
      .get(`/api/word?isBookmarked=${true}`) //
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
