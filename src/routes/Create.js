export function Create() {
  return (
    <div className="create">
      <form action="">
        <label htmlFor="">주제</label>
        <input type="text" />
        <ul>
          <li>
            <label htmlFor="">영문</label>
            <input type="text" />
            <label htmlFor="">한글</label>
            <input type="text" />
          </li>
          <li>
            <label htmlFor="">영문</label>
            <input type="text" />
            <label htmlFor="">한글</label>
            <input type="text" />
          </li>
          <button>+</button>
        </ul>
      </form>
    </div>
  );
}
