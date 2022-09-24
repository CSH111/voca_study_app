import { useContext, useEffect, useState } from "react";
import { WordListItem } from "./WordListItem";
import List from "./List";
import axios from "axios";
import ListItem from "./ListItem";
import { DataContext } from "../../context/DataContext";
import Spinner from "../Spinner";

export function WordList({ topic, isBookmarkList, wordItemLoading }) {
  const store = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = isBookmarkList ? `isBookmarked=${true}` : `topic=${topic}`;
    axios
      .get(`/api/word?${query}`) //
      .then((res) => {
        store.setWords(res.data.words);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (!store.words.length) {
    return <div>단어를 추가하세요.</div>;
  }
  return (
    <List>
      {store.words.map((word) => (
        <WordListItem word={word} key={word._id} />
      ))}
      {wordItemLoading ? (
        <ListItem>
          <Spinner />
        </ListItem>
      ) : null}
    </List>
  );
}
