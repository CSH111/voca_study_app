import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import List from "../common/Lists/List";
import TopicListItem from "./TopicListItem";
import styled from "styled-components";
import axios from "axios";
import Spinner from "../common/Spinner";

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
  const [topicsLoading, setTopicsLoading] = useState(false);
  const store = useContext(DataContext);

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
