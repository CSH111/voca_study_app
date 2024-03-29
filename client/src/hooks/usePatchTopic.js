import { useState } from "react";

import { wordbookActionType as WAT } from "../constants";
import { useWordbookDispatch } from "../context";
import { wordbookService } from "../services";

const usePatchTopic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useWordbookDispatch();

  const patchTopic = async (id, body) => {
    setIsLoading(true);
    try {
      const res = await wordbookService.patchTopic(id, body);
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
