import { useState } from "react";
import { wordbookActionType as WAT } from "../constants";
import { useWordbookDispatch } from "../context/WordbookContext";
import { wordbookService } from "../services";

const useDeleteTopic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useWordbookDispatch();

  const deleteTopic = async (id) => {
    setIsLoading(true);
    try {
      const res = await wordbookService.deleteTopic(id);
      const { topics, words } = res.data;
      dispatch({ type: WAT.DELETE_TOPIC_FULFILLED, payload: { topics, words } });
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTopic, isLoading, isError };
};

export default useDeleteTopic;
