import * as S from "./styles";
import { BookMarkIcon } from "../common/icons";
import ListItem from "../common/Lists/ListItem";
import styled from "styled-components";

const BookMarkListItem = () => {
  return (
    <ListItem>
      <S.ListContainer>
        {/* <S.Link to={"/bookmark"} className="toBookmark"> */}
        <BookMarkIcon fontSize="25px" />
        <StyledTitle>북마크 단어 모음</StyledTitle>
        {/* </S.Link> */}
      </S.ListContainer>
      {/* <div></div> */}
    </ListItem>
  );
};

export default BookMarkListItem;

const StyledTitle = styled.h4`
  margin-left: 10px;
`;
