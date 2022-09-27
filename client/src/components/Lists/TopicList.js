import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import List from "./List";
import TopicListItem from "./TopicListItem";
import styled from "styled-components";
import axios from "axios";
import Spinner from "../Spinner";

const StyledList = styled(List)`
  position: relative;
  > .spinner {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 2.5rem;
  }
`;
const TopicList = () => {
  const [topicsLoading, setTopicsLoading] = useState(true);
  const store = useContext(DataContext);

  useEffect(() => {
    axios
      .get("/api/topic") //
      .then((res) => {
        store.setTopics(res.data.topics);
        setTopicsLoading(false);
      })
      .catch(console.log);
  }, []);

  const listItems = store.topics.length ? (
    store.topics.map((topic) => <TopicListItem topic={topic} key={topic._id} />)
  ) : (
    <div>토픽을 추가하세요</div>
  );

  return (
    <StyledList>
      {topicsLoading && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      {!topicsLoading && listItems}
    </StyledList>
  );
};

export default TopicList;
