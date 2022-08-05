import { useContext, useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import Loading from "./Loading";
import { WordListItem } from "./WordListItem";

export function WordList({ topic, wordItemLoading }) {
  const [loading, setLoading] = useState(true);
  const words = useFetch(
    `http://localhost:3001/words?topic=${topic}`,

    setLoading
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <table>
      <tbody>
        {words.map((word) => (
          <WordListItem word={word} key={word.id} />
        ))}
        {wordItemLoading ? (
          <tr>
            <td colSpan="6">loading...</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
