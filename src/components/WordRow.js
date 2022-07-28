import { useRef, useState } from "react";

export function Wordrow({ word }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);
  function handleDelBtn() {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "DELETE",
    }).then((response) => {
      response.ok && setIsDeleted(true);
    });
  }
  function handleIsDone() {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...word,
        isDone: !word.isDone,
      }),
    }).then((response) => {
      response.ok && setIsDone(!isDone);
    });
  }
  return (
    <>
      {isDeleted ? null : (
        <tr>
          <td>
            <input
              type="checkbox"
              name=""
              id=""
              onChange={handleIsDone}
              checked={isDone}
            />
          </td>
          <td>{word.eng}</td>
          <td>{word.kor}</td>
          <td>
            <button>뜻 숨기기</button>
          </td>
          <td>
            <button>북마크</button>
          </td>
          <td>
            <button onClick={handleDelBtn}>삭제</button>
          </td>
          <td>
            <button>수정</button>
          </td>
        </tr>
      )}
    </>
  );
}
