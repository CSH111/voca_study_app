import { useContext, useEffect, useState } from "react";
import { WordListItem } from "./WordListItem";
import List from "../common/Lists/List";
import axios from "axios";
import ListItem from "../common/Lists/ListItem";
import { DataContext } from "../../context/DataContext";
import Spinner from "../common/Spinner";
import styled from "styled-components";

const StyledList = styled(List)`
  position: relative;
  > .spinner {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 2.5rem;
  }
`;

const WordList = ({ topic, wordItemLoading }) => {
  const store = useContext(DataContext);
  const [listLoading, setListLoading] = useState(true);

  useEffect(() => {
    const query =
      topic === "bookmark" ? `isBookmarked=${true}` : `topic=${topic}`;

    axios
      .get(`/api/word?${query}`) //
      .then((res) => {
        store.setWords(res.data.words);
        setListLoading(false);
      });
  }, []);

  const listItems = store.words.length ? (
    store.words.map((word) => <WordListItem word={word} key={word._id} />)
  ) : (
    <div>단어를 추가하세요</div>
  );

  return (
    <StyledList>
      {listLoading && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      {!listLoading && listItems}
      {wordItemLoading ? (
        <ListItem>
          <Spinner />
        </ListItem>
      ) : null}
    </StyledList>
  );
};

export default WordList;

//리팩토링할거=> 워드 추가시 store에 바로반영 => 반투명화 + 스피너on => 서버수신확인 => 불투명+ 스피너 off
