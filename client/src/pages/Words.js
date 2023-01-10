import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Paper, PaperTitle } from "../components/common";
import { GoBackIcon } from "../components/common/icons";
import { WordGenerator, WordList } from "../components/Words";
import { useWordbookSelector } from "../context";

function Words() {
  const { topic: topicName } = useParams();
  const { topics } = useWordbookSelector();
  const [newItemLoading, setNewItemLoading] = useState(false);
  const navigate = useNavigate();
  const topicID = useMemo(() => {
    return topics.find((_topic) => _topic.topicName === topicName)?._id;
  }, [topics, topicName]);

  return (
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
  );
}

export default Words;
