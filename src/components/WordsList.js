import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dummy from "../db/data.json";

export function WordsList() {
  const { topic } = useParams();

  const [words, setWords] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/words?topic=${topic}`)
      .then((response) => response.json())
      .then((data) => setWords(data));
  }, []);

  return (
    <table>
      <tbody>
        {words.map((word) => {
          return (
            <tr key={word.id}>
              <td>{word.eng}</td>
              <td>{word.kor}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
