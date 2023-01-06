import { useState } from "react";
import { wordbookActionType as WAT } from "../constants";
import { useWordbookDispatch } from "../context/WordbookContext";
import { wordbookService } from "../services";

const usePostTopic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useWordbookDispatch();

  const postTopic = async (topicName) => {
    setIsLoading(true);
    const trimedValue = topicName.trim();

    try {
      const res = await wordbookService.postTopic({ topicName: trimedValue });
      dispatch({ type: WAT.POST_TOPIC_FULFILLED, payload: res.data.topics });
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { postTopic, isLoading, isError };
};

export default usePostTopic;
