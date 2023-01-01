import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer, Paper } from "../components/common";

const Study = () => {
  const { topic } = useParams();
  const [words, setWords] = useState([]);

  console.log(topic);
  useEffect(() => {
    if (topic === "bookmark") {
      return;
    }
  }, []);

  return (
    <PageContainer>
      <Paper width="500px"></Paper>
    </PageContainer>
  );
};

export default Study;
