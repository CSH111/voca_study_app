import React, { useRef, useState } from "react";

export function Create() {
  const tbody = useRef();
  const createEmptyPlace = () => {
    const result = [];
    const emptySpaceNumber = 4;
    for (let i = 0; i < emptySpaceNumber; i++) {
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
  const [morePlace, setMorePlace] = useState([]);
  const createMorePlace = (e) => {
    e.preventDefault();
    setMorePlace([
      ...morePlace,
      <tr key={Date.now()}>
        <td>
          <input type="text" />
        </td>
        <td>
          <input type="text" />
        </td>
      </tr>,
    ]);
  };
  // console.log(tbody.current.childNodes);
  const createWords = (e) => {
    e.preventDefault();
    console.log("crt");
    fetch("http://localhost:3001/topics", {});
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
          <tbody ref={tbody}>
            {createEmptyPlace()}
            {morePlace}
          </tbody>
        </table>
        <button onClick={createMorePlace}>+</button>
        <div></div> <button onClick={createWords}>생성</button>
      </form>
    </div>
  );
}
