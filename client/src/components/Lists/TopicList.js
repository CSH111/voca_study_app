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

const TopicList = ({ itemLoading }) => {
  const [loading, setLoading] = useState(true);
  const { topics, setTopics } = useContext(TopicDataContext);

  // useEffect(() => {
  //   fetch(`http://localhost:3001/topics`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setLoading(false);
  //       setTopics(data);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .post("/api/data/topic/read", null) //
      .then((res) => {
        console.log(res.data.topics);
        setTopics(res.data.topics);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  if (loading) {
    return <div>loading..</div>;
  }
  if (!topics.length && !itemLoading) {
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
          <TopicListItem topic={topic.topicName} key={topic._id} />
        ))}
        {itemLoading ? <li>Loading...</li> : null}
      </List>
    </>
  );
};

export default TopicList;
