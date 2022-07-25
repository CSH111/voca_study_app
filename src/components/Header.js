import { Routes, BrowserRouter, Route, Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to={"/"}>
        <h1>나의 단어장</h1>
      </Link>
      <Link to={"/create"}>
        <button>만들기</button>
      </Link>
    </header>
  );
}
