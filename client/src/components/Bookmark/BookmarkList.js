import { Fragment, useMemo } from "react";

import { useWordbookSelector } from "../../context/WordbookContext";
import { Devider, EmptyMsgBox } from "../common";
import { List } from "../common";
import { Spinner } from "../common/icons";
import WordListItem from "../Words/WordListItem";

const BookmarkList = () => {
  const { words, isLoading } = useWordbookSelector();
  const bookmarkedWords = useMemo(
    () => words.filter((word) => word.isBookmarked === true),
    [words]
  );

  const listItem = bookmarkedWords.length ? (
    bookmarkedWords.map((word) => (
      <Fragment key={word._id}>
        <WordListItem wordID={word._id} wordData={word} />
        <Devider margin="10px 0" width="1px" themeColor={{ color: "gray", level: "main" }} />
      </Fragment>
    ))
  ) : (
    <EmptyMsgBox>북마크한 단어가 없습니다.</EmptyMsgBox>
  );

  return (
    <List>
      {isLoading ? (
        <div className="list-spinner">
          <Spinner />
        </div>
      ) : (
        listItem
      )}
    </List>
  );
};

export default BookmarkList;
