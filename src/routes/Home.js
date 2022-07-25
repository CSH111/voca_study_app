import Topic from "../components/Topic";
import dummy from "../db/data.json";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <ul>
      {dummy.topics.map((topic) => (
        <li key={topic.id}>
          <Link to={`/${topic.topic}`}>
            {topic.topic} <span>5/10</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
