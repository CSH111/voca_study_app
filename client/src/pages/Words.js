import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useWordbook } from "../services/WordbookContext";
import Button from "../components/common/Button";
import { WordGenerator, WordList } from "../components/Words";
import { GoBackIcon } from "../components/common/icons";
import { PageContainer, Paper, PaperTitle } from "../components/common";

function Words() {
  const { topic } = useParams();
  const {
    topicsData: { topics },
    isDataInitiated,
  } = useWordbook();
  const [topicID, setTopicID] = useState("");
  const [wordItemLoading, setwordItemLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDataInitiated) return;
    const isRightTopic = topics.find((_topic) => _topic.topicName === topic);
    if (!isRightTopic) {
      navigate("/topics");
    }
  }, [topic, isDataInitiated]);
  // TODO: 이펙트 두개 합치기
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
