import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Devider, Paper, PaperTitle } from "../components/common";
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
      height="95%"
      forPage
      bodyAlign="flex-start"
      paperHeader={
        <>
          <PaperTitle>{topicName}</PaperTitle>
          <Button onClick={() => navigate("/topics")} width="35px" height="35px">
            <GoBackIcon />
          </Button>
        </>
      }
      paperFooter={
        <>
          <Devider margin="15px 0" width="2px" />
          <WordGenerator
            topicName={topicName}
            topicID={topicID}
            setNewItemLoading={setNewItemLoading}
          />
        </>
      }
    >
      <Devider margin="0 0 15px 0" width="2px" />
      <WordList topicName={topicName} isNewItemLoading={newItemLoading} />
    </Paper>
  );
}

export default Words;
