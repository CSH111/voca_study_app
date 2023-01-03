import React, { Fragment } from "react";
import { useWordbookContext } from "../../context/WordbookContext";
import { Devider } from "../common";
import { Spinner } from "../common/icons";
import WordListItem from "../Words/WordListItem";

const BookmarkList = () => {
  const {
    wordsData: { words, loading },
  } = useWordbookContext();
  const bookmarkedWords = words.filter((word) => word.isBookmarked === true);

  const listItem = words.length ? (
    bookmarkedWords.map((word) => (
      <Fragment key={word._id}>
        <WordListItem wordID={word._id} wordData={word} />
        <Devider margin="10px 0" width="2px" color="#c4c4c4" />
      </Fragment>
    ))
  ) : (
    <div>단어를 추가하세요</div>
  );

  return loading ? <Spinner /> : listItem;
};

export default BookmarkList;
