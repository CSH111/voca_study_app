import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useWordbookSelector } from "../context";
import Button from "../components/common/Button";
import { WordGenerator, WordList } from "../components/Words";
import { GoBackIcon } from "../components/common/icons";
import { PageContainer, Paper, PaperTitle } from "../components/common";
import { useMemo } from "react";
//TODO: 리스트 화면 넘어가면 갑자기 가로스크롤생김.
function Words() {
  const { topic: topicName } = useParams();
  const { topics } = useWordbookSelector();
  const [newItemLoading, setNewItemLoading] = useState(false);
  const navigate = useNavigate();
  const topicID = useMemo(() => {
    return topics.find((_topic) => _topic.topicName === topicName)?._id;
  }, [topics, topicName]);

  return (
    <PageContainer align="flex-start">
      <Paper
        width="100%"
        flex="1"
        bodyAlign="flex-start"
        paperHeader={
          <PaperTitle>
            {topicName}{" "}
            <Button onClick={() => navigate("/topics")} width="35px" height="35px">
              <GoBackIcon />
            </Button>
          </PaperTitle>
        }
      >
        <WordGenerator
          topicName={topicName}
          topicID={topicID}
          setNewItemLoading={setNewItemLoading}
        />
        <WordList topicName={topicName} isNewItemLoading={newItemLoading} />
      </Paper>
    </PageContainer>
  );
}

export default Words;
