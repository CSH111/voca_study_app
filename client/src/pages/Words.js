import { useEffect } from "react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Devider, Paper, PaperTitle } from "../components/common";
import { GoBackIcon } from "../components/common/icons";
import { WordGenerator, WordList } from "../components/Words";
import { useWordbookSelector } from "../context";

function Words() {
  const { topic } = useParams();
  const { topics, isLoading } = useWordbookSelector();
  const [newItemLoading, setNewItemLoading] = useState(false);
  const navigate = useNavigate();
  const { _id: topicID, lang } =
    useMemo(() => {
      return topics.find((_topic) => _topic.topicName === topic);
    }, [topics, topic]) || {};

  useEffect(() => {
    if (isLoading) return;
    const isValidTopic = topics.some(({ topicName }) => topicName === topic);
    if (!isValidTopic) navigate("/topics");
  }, [topics, isLoading]);

  return (
    <Paper
      width="100%"
      height="95%"
      bodyAlign="flex-start"
      bigPage
      paperHeader={
        <>
          <PaperTitle>{topic}</PaperTitle>
          <Button onClick={() => navigate("/topics")} width="35px" height="35px">
            <GoBackIcon />
          </Button>
        </>
      }
      paperFooter={
        <>
          <Devider margin="15px 0" width="2px" />
          <WordGenerator
            topicName={topic}
            topicID={topicID}
            lang={lang}
            setNewItemLoading={setNewItemLoading}
          />
        </>
      }
    >
      <Devider margin="0 0 15px 0" width="2px" />
      <WordList topicName={topic} isNewItemLoading={newItemLoading} />
    </Paper>
  );
}

export default Words;
