import { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../context/UpdateContext";
import useFetch from "../hook/useFetch";
import Loading from "./Loading";
import Topic from "./Topic";

const TopicList = function () {
  const [loading, setLoading] = useState(true);
  const { updateState } = useContext(UpdateContext);

  const topics = useFetch(
    `http://localhost:3001/topics`,
    updateState,
    setLoading
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ul>
        {topics.map((topic) => (
          <Topic topic={topic} key={topic.id} />
        ))}
      </ul>
    </>
  );
};

export default TopicList;
