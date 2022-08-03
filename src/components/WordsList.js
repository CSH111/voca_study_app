import { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../context/UpdateContext";
import useFetch from "../hook/useFetch";
import Loading from "./Loading";
import { Wordrow } from "./WordRow";

export function WordsList({ topic }) {
  const { updateState } = useContext(UpdateContext);
  const [loading, setLoading] = useState(true);

  const words = useFetch(
    `http://localhost:3001/words?topic=${topic}`,
    updateState,
    setLoading
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <table>
      <tbody>
        {words.map((word) => (
          <Wordrow word={word} key={word.id} />
        ))}
      </tbody>
    </table>
  );
}
