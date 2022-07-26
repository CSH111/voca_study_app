import Topic from "../components/Topic";
import dummy from "../db/data.json";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Home() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/topics")
      .then((response) => response.json())
      .then((data) => setTopics(data));
  }, []);
  console.log(topics);
  return (
    <>
      <Link to={"/create"}>
        <button>새로 만들기</button>
      </Link>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <Topic topic={topic} />
            <button>토픽 삭제</button>
          </li>
        ))}
      </ul>
    </>
  );
}
