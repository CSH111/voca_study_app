import { Fragment } from "react";
import WordListItem from "./WordListItem";
import { useWordbook } from "../../services/WordbookContext";
import { Spinner } from "../../components/common/icons";
import styled from "styled-components";
import List from "../../components/common/Lists/List";
import { Devider } from "../common";
import WordItemSkeleton from "./WordItemSkeleton";

const WordList = ({ topic, isNewItemLoading }) => {
  const {
    wordsData: { words: allWords, loading },
  } = useWordbook();
  const words = allWords.filter((word) => word.topic === topic);

  const listItems = words.length ? (
    words.map((word) => (
      <Fragment key={word._id}>
        <WordListItem wordID={word._id} wordData={word} />
        <Devider margin="10px 0" width="2px" color="#c4c4c4" />
      </Fragment>
    ))
  ) : (
    <div>단어를 추가하세요</div>
  );

  return (
    <StyledList>
      {loading && (
        <div className="list-spinner">
          <Spinner />
        </div>
      )}
      {!loading && listItems}
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
