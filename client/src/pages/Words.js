import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { DataContext } from "../services/DataContext";
import Button from "../components/common/Button";
import { WordGenerator, WordList, WordListItem } from "../components/Words";
import { GoBackIcon } from "../components/common/icons";
import { Devider, PageContainer, Paper, PaperTitle } from "../components/common";

function Words() {
  const params = useParams();
  const topic = params.topic;
  const store = useContext(DataContext);
  const [topicID, setTopicID] = useState("");
  const [wordItemLoading, setwordItemLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currTopicID = store.topicsData.topics.find((_topic) => _topic.topicName === topic)?._id;
    setTopicID(currTopicID);
  }, []);

  return (
    <PageContainer align="flex-start">
      <Paper
        width="100%"
        flex="1"
        bodyAlign="flex-start"
        paperHeader={
          <PaperTitle>
            {topic}{" "}
            <Button onClick={() => navigate("/topics")} width="35px" height="35px">
              <GoBackIcon />
            </Button>
          </PaperTitle>
        }
      >
        <WordGenerator topic={topic} topicID={topicID} setwordItemLoading={setwordItemLoading} />
        <WordList topic={topic} isNewItemLoading={wordItemLoading} />
      </Paper>
    </PageContainer>
  );
}

export default Words;
