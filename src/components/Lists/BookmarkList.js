import { useContext, useEffect, useState } from "react";

import { WordsDataContext } from "../../context/WordsDataContext";
import Loading from "../Loading";
import { WordListItem } from "./WordListItem";

const BookmarkList = ({ itemLoading }) => {
  const { words, setWords } = useContext(WordsDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/words?isBookmarked=true`)
      .then((res) => res.json())
      .then((data) => {
        setWords(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!words.length && !itemLoading) {
    return <div>북마크한 단어가 없습니다.</div>;
  }
  return (
    <table>
      <tbody>
        {words.map((word) => (
          <WordListItem word={word} key={word.id} />
        ))}
        <tr>
          <td colSpan={6}>{itemLoading ? "loading..." : null}</td>
        </tr>
      </tbody>
    </table>
  );
};
export default BookmarkList;
