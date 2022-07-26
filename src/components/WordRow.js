export function Wordrow({ word }) {
  return (
    <tr key={word.id}>
      <td>
        <input type="checkbox" name="" id="" />
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
        <button>삭제</button>
      </td>
      <td>
        <button>수정</button>
      </td>
    </tr>
  );
}
