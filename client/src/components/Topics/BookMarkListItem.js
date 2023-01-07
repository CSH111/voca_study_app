import * as S from "./styles";
import { BookMarkIcon } from "../common/icons";
import ListItem from "../common/Lists/ListItem";
import LinkModal from "./LinkModal";
import { useModal, useWordbookSelector } from "../../context";

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
