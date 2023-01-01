import React from "react";
import { useWordbook } from "../../services/WordbookContext";
import { Devider } from "../common";
import { Spinner } from "../common/icons";
import WordListItem from "../Words/WordListItem";

const BookmarkList = () => {
  const {
    wordsData: { words, loading },
  } = useWordbook();
  const bookmarkedWords = words.filter((word) => word.isBookmarked === true);

  const listItem = words.length ? (
    bookmarkedWords.map((word) => (
      <>
        <WordListItem wordID={word._id} key={word._id} />
        <Devider margin="10px 0" width="2px" color="#c4c4c4" />
      </>
    ))
  ) : (
    <div>단어를 추가하세요</div>
  );

  return loading ? <Spinner /> : listItem;
};

export default BookmarkList;
