import { Fragment, useContext, useEffect, useState } from "react";
import WordListItem from "./WordListItem";
import { DataContext } from "../../services/DataContext";
import { Spinner } from "../../components/common/icons";
import styled from "styled-components";
import ListItem from "../../components/common/Lists/ListItem";
import List from "../../components/common/Lists/List";
import { Devider } from "../common";
import WordItemSkeleton from "./WordItemSkeleton";

const WordList = ({ topic, isNewItemLoading }) => {
  const store = useContext(DataContext);
  const isListLoading = store.wordsData.loading;
  const words = store.wordsData.words.filter((word) => word.topic === topic);

  const listItems = words.length ? (
    words.map((word) => (
      <Fragment key={word._id}>
        <WordListItem wordID={word._id} />
        <Devider margin="10px 0" width="2px" color="#c4c4c4" />
      </Fragment>
    ))
  ) : (
    <div>단어를 추가하세요</div>
  );

  return (
    <StyledList>
      {isListLoading && (
        <div className="list-spinner">
          <Spinner />
        </div>
      )}
      {!isListLoading && listItems}
      {isNewItemLoading && (
        <>
          <WordItemSkeleton />
          <Devider margin="10px 0" width="2px" color="#c4c4c4" />
        </>
      )}
    </StyledList>
  );
};

export default WordList;

//리팩토링할거=> 워드 추가시 store에 바로반영 => 반투명화 + 스피너on => 서버수신확인 => 불투명+ 스피너 off
const StyledList = styled(List)`
  position: relative;
  margin-top: 25px;
  > .list-spinner {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 2.5rem;
  }
`;
