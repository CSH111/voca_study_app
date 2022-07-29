export function Create() {
  const createEmptyPlace = function () {
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <tr key={i}>
          <td>
            <input type="text" />
          </td>
          <td>
            <input type="text" />
          </td>
        </tr>
      );
    }
    return result;
  };
  return (
    <div className="create">
      <form action="">
        <label htmlFor="inputTopic">주제</label>
        <input type="text" id="inputTopic" />
        <hr />
        <table>
          <thead>
            <tr>
              <td>단어</td>
              <td>뜻</td>
            </tr>
          </thead>
          <tbody>{createEmptyPlace()}</tbody>
        </table>
        <button>+</button>
        <div></div> <button>생성</button>
      </form>
    </div>
  );
}
