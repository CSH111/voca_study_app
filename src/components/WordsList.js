import { useParams } from "react-router-dom";
import dummy from "../db/data.json";

export function WordsList() {
  const { topic } = useParams();
  console.log(topic);
  console.log(dummy);
  return (
    <ul>
      <li>단어1</li>
      <li>단어2</li>
      <li>단어3</li>
      <li>단어4</li>
    </ul>
  );
}
