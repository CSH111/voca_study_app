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
    dispatch({ type: WAT.DELETE_TOPIC_PENDING });
    try {
      await wordbookService.deleteTopic(id);
      dispatch({ type: WAT.DELETE_TOPIC_FULFILLED, payload: id });
    } catch (err) {
      setIsError(true);
      dispatch({ type: WAT.DELETE_TOPIC_REJECTED });
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTopic, isLoading, isError };
};

export default useDeleteTopic;
