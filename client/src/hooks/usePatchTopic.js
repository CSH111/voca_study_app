import { useState } from "react";
import { wordbookActionType as WAT } from "../constants";
import { useWordbookDispatch } from "../context/WordbookContext";
import { wordbookService } from "../services";

const usePatchTopic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useWordbookDispatch();

  const patchTopic = async (id, { topicName }) => {
    setIsLoading(true);
    try {
      //TODO: 에러핸들링, 바디하나로(서버까지손보기)
      const res = await wordbookService.patchTopic(id, { topicName });
      const { topics, words } = res.data;
      dispatch({ type: WAT.PATCH_TOPIC_FULFILLED, payload: { topics, words } });
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { patchTopic, isLoading, isError };
};

export default usePatchTopic;
