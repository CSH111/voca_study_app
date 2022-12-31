import * as S from "./styles";
import { BookMarkIcon } from "../common/icons";
import ListItem from "../common/Lists/ListItem";
import styled from "styled-components";
import LinkModal from "./LinkModal";
import { useState } from "react";

const BookMarkListItem = () => {
  const [isLinkModalOpened, setIsLinkModalOpened] = useState(false);

  const handleListClick = () => {
    setIsLinkModalOpened(true);
  };
  return (
    <ListItem onClick={handleListClick}>
      <S.ListContainer>
        <BookMarkIcon fontSize="25px" />
        <StyledTitle>북마크 단어 모음</StyledTitle>
      </S.ListContainer>

      <LinkModal
        isOpen={isLinkModalOpened}
        setIsOpen={setIsLinkModalOpened}
        leftLink={`/test/bookmark}`}
        rightLink={`/bookmark`}
      />
    </ListItem>
  );
};

export default BookMarkListItem;

const StyledTitle = styled.h4`
  margin-left: 10px;
`;
