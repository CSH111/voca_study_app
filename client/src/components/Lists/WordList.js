import { useContext, useEffect, useState } from "react";

import { WordsDataContext } from "../../context/WordsDataContext";
import Loading from "../Loading";
import { WordListItem } from "./WordListItem";

import List from "./List";
import axios from "axios";
import ListItem from "./ListItem";

export function WordList({ topic, isBookmarkList, wordItemLoading }) {
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
  if (!words.length) {
    return <div>단어를 추가하세요.</div>;
  }
  return (
    <List>
      {words.map((word) => (
        <WordListItem word={word} key={word._id} />
      ))}
      {wordItemLoading ? <ListItem>loading...(spinner)</ListItem> : null}
    </List>
  );
}
