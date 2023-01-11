import { useModal, useWordbookSelector } from "../../context";
import { ListItem } from "../common";
import { BookMarkIcon } from "../common/icons";
import { LinkModal } from "./";
import * as S from "./styles";

const BookMarkListItem = () => {
  const { words } = useWordbookSelector();
  const { openModal } = useModal();
  const bookmarkedWordsAmount = words.filter((word) => word.isBookmarked).length;
  const handleListClick = () => {
    openModal(
      <LinkModal leftLink={`/test/bookmark`} rightLink={`/bookmark`} title="My Bookmark" />
    );
  };

  return (
    <ListItem onClick={handleListClick}>
      <S.ListContainer>
        <BookMarkIcon fontSize="25px" />
        <div className="topic-data">
          <span>({bookmarkedWordsAmount})</span>
          <h3>북마크 단어 모음</h3>
        </div>
      </S.ListContainer>
    </ListItem>
  );
};

export default BookMarkListItem;
