import styled from "styled-components";

import { useModal, useWordbookSelector } from "../../context";
import { ListItem } from "../common";
import { BookMarkIcon } from "../common/icons";
import { LinkModal } from ".";

const BookmarkTopicListItem = () => {
  const { words } = useWordbookSelector();
  const { openModal } = useModal();
  const bookmarkedWordsAmount = words.filter((word) => word.isBookmarked).length;
  const handleListClick = () => {
    openModal(
      <LinkModal
        leftLink={`/study/bookmark`}
        rightLink={`/bookmark`}
        title="My Bookmark"
        wordsAmount={bookmarkedWordsAmount}
      />
    );
  };

  return (
    <StyledListItem onClick={handleListClick}>
      <BookMarkIcon fontSize="25px" className="folder-icon" />
      <span>({bookmarkedWordsAmount})</span>
      <h3>북마크 단어 모음</h3>
    </StyledListItem>
  );
};

const StyledListItem = styled(ListItem)`
  justify-content: flex-start;
  .folder-icon {
    margin: 0 10px;
  }
`;

export default BookmarkTopicListItem;
