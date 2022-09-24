import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import List from "./List";
import TopicListItem from "./TopicListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import axios from "axios";
import Spinner from "../Spinner";

const StyledDiv = styled.div`
  align-self: flex-end;
`;

const TopicList = () => {
  const [topicsLoading, setTopicsLoading] = useState(true);
  // const { topics, setTopics } = useContext(TopicDataContext);
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

  if (topicsLoading) {
    return <Spinner />;
  }

  if (!store.topics.length) {
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
        {store.topics.map((topic) => (
          <TopicListItem topic={topic} key={topic._id} />
        ))}
      </List>
    </>
  );
};

export default TopicList;
