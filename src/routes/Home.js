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
    <ul>
      {topics.map((topic) => (
        // <li key={topic.id}>
        //   <Link to={`/${topic.topic}`}>
        //     {topic.topic} <span>5/10</span>
        //   </Link>
        // </li>

        <li key={topic.id}>
          <Topic topic={topic} />
        </li>
      ))}
    </ul>
  );
}
