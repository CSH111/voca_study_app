import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useWordbookSelector } from "../context";
import Button from "../components/common/Button";
import { WordGenerator, WordList } from "../components/Words";
import { GoBackIcon } from "../components/common/icons";
import { PageContainer, Paper, PaperTitle } from "../components/common";
//TODO: 리스트 화면 넘어가면 갑자기 가로스크롤생김.
function Words() {
  const { topic } = useParams();
  const { topics } = useWordbookSelector();
  const [topicID, setTopicID] = useState("");
  const [wordItemLoading, setwordItemLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currTopicID = topics.find((_topic) => _topic.topicName === topic)?._id;
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
