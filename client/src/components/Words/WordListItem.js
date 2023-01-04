import { useRef, useState } from "react";
import styled from "styled-components";
import { useWordbookContext } from "../../context";
import * as S from "./styles";

import { StarIcon, EditIcon, DeleteIcon, CheckIcon, CancelIcon } from "../common/icons";
import ListItem from "../../components/common/Lists/ListItem";
import { InputBox, Ellipsis, Button, DeleteModal, BookmarkButton } from "../../components/common";
import { Spinner } from "../common/icons";
import { wordbookService } from "../../services";

const WordListItem = ({ wordData }) => {
  const { isBookmarked, isMemorized, word, meaning, _id: id } = wordData;
  const {
    setWordsData,
    wordsData: { words: allWords },
  } = useWordbookContext();

  const [isModifying, setIsModifying] = useState(false);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const wordInputElem = useRef();
  const meaningInputElem = useRef();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDeleteModal = () => {
    setIsDeleteModalOpened(true);
  };
  const handleDelete = () => {
    setIsDeleteLoading(true);
    setIsDeleteModalOpened(false);
    wordbookService
      .deleteWord(id)
      .then((res) => {
        setWordsData((data) => {
          return {
            ...data,
            words: data.words.filter((_word) => _word._id !== id),
          };
        });
      })
      .finally(() => {
        setIsDeleteLoading(false);
      });
  };

  const handleIsMemorized = async () => {
    setIsItemLoading(true);
    await updateWord({ isMemorized: !isMemorized }) //
      .catch(console.log);
    setIsItemLoading(false);
  };

  const handleBookmark = async () => {
    setIsItemLoading(true);
    await updateWord({ isBookmarked: !isBookmarked }) //
      .catch(console.log);
    setIsItemLoading(false);
  };

  const updateWord = (changedDataObj) => {
    const body = {
      ...wordData,
      ...changedDataObj,
    };
    return wordbookService
      .patchWord(id, body) //
      .then(() => {
        setWordsData((data) => ({
          ...data,
          words: getModifiedWords(body),
        }));
      });
  };

  const getModifiedWords = (newWord) =>
    allWords.map((_word) => {
      if (_word._id === id) {
        return newWord;
      }
      return _word;
    });

  const handleSubmission = async (e) => {
    e.preventDefault();
    setIsItemLoading(true);
    setIsModifying(false);
    await updateWord({
      word: wordInputElem.current.value,
      meaning: meaningInputElem.current.value,
    }).catch(console.log);
    setIsItemLoading(false);
  };

  const handleFixModeOpen = () => {
    setIsModifying(true);
    setTimeout(() => {
      wordInputElem.current.focus();
      wordInputElem.current.value = word;
      meaningInputElem.current.value = meaning;
    }, 0);
  };

  const handleFixModeClose = () => {
    setIsModifying(false);
  };

  const listItemContents = isModifying ? (
    <S.Form onSubmit={handleSubmission} action="" columnOnSmallDevice={true}>
      <S.Controls>
        <S.InputContainer>
          <InputBox className="input" type="text" ref={wordInputElem} />
        </S.InputContainer>
        <S.InputContainer>
          <InputBox type="text" ref={meaningInputElem} />
        </S.InputContainer>
      </S.Controls>
      <StyledButtonsBox>
        <Button type="submit" color="green" width="35px" height="35px">
          <CheckIcon />
        </Button>
        <Button type="button" width="35px" height="35px" onClick={handleFixModeClose}>
          <CancelIcon />
        </Button>
      </StyledButtonsBox>
    </S.Form>
  ) : (
    <StyledDiv className="data" isMemorized={isMemorized} onClick={handleIsMemorized}>
      <div className="word"> {word}</div>

      <div className="meaning">{meaning}</div>
    </StyledDiv>
  );

  return (
    <ListItem cursor="pointer">
      {(isItemLoading || isDeleteLoading) && (
        <>
          <div className="blur-filter"></div>
          <div className="spinner">
            <Spinner />
          </div>
        </>
      )}
      {listItemContents}
      <Ellipsis
        items={
          <>
            <Button onClick={handleDeleteModal} color="red">
              <DeleteIcon />
            </Button>
            <Button onClick={handleFixModeOpen}>
              <EditIcon />
            </Button>
            <BookmarkButton onClick={handleBookmark} isBookmarked={isBookmarked}>
              <StarIcon />
            </BookmarkButton>
          </>
        }
      />
      <DeleteModal
        handleDelete={handleDelete}
        setIsOpen={setIsDeleteModalOpened}
        isOpen={isDeleteModalOpened}
        msg="삭제한 단어는 복구할 수 없습니다. 정말로 삭제하시겠습니까?"
        isLoading={isDeleteLoading}
      />
    </ListItem>
  );
};

export default WordListItem;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-self: stretch;
  align-items: flex-start;

  width: 100%;
  transition: all 0.2s;

  font-style: ${({ isMemorized }) => (isMemorized ? "italic" : "")};
  text-decoration: ${({ isMemorized }) => (isMemorized ? "line-through" : "none")};
  > div {
    text-align: center;
    padding-bottom: 0.1rem;
    margin-left: 0.5rem;
    min-width: 70px;
    border-bottom: solid #3c3c3c 1px;
  }
`;

const StyledButtonsBox = styled.div`
  display: flex;
`;
