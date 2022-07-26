import { Link } from "react-router-dom";

export default function Topic({ topic }) {
  return (
    <Link to={`/${topic.topic}`}>
      <div>
        <h3>{topic.topic}</h3> <span>5/10</span>
      </div>
    </Link>
  );
}
