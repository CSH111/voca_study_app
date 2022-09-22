import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TopicDataContext } from "../../context/TopicDataContext";
import List from "./List";
import TopicListItem from "./TopicListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import axios from "axios";

const StyledDiv = styled.div`
  align-self: flex-end;
`;

const TopicList = () => {
  const [topicsLoading, setTopicsLoading] = useState(true);
  const { topics, setTopics } = useContext(TopicDataContext);

  useEffect(() => {
    axios
      .get("/api/topic") //
      .then((res) => {
        setTopics(res.data.topics);
        setTopicsLoading(false);
      })
      .catch(console.log);
  }, []);

  if (topicsLoading) {
    return <div>loaing...</div>;
  }

  if (!topics.length) {
    return <div>토픽을 추가하세요.</div>;
  }
  return (
    <>
      <StyledDiv>
        <Link to={"/bookmark"}>
          <FontAwesomeIcon icon={["fas", "star"]} /> my bookmark
        </Link>
      </StyledDiv>
      <List>
        {topics.map((topic) => (
          <TopicListItem topic={topic} key={topic._id} />
        ))}
      </List>
    </>
  );
};

export default TopicList;
