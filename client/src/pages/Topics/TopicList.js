import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../services/DataContext";
import TopicListItem from "./TopicListItem";
import styled from "styled-components";
import Spinner from "../../components/common/Spinner";
import List from "../../components/common/Lists/List";

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
  const store = useContext(DataContext);
  const topicsLoading = store.topicsData.loading;

  const listItems = store.topicsData.topics.length ? (
    store.topicsData.topics.map((topic) => (
      <TopicListItem topic={topic} key={topic._id} />
    ))
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
