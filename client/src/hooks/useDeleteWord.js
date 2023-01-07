import { useState } from "react";
import { wordbookActionType as WAT } from "../constants";
import { useWordbookDispatch } from "../context";
import { wordbookService } from "../services";

const useDeleteWord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useWordbookDispatch();

  const deleteWord = async (id) => {
    setIsLoading(true);
    try {
      const res = await wordbookService.deleteWord(id);
      const { words } = res.data;
      dispatch({ type: WAT.DELETE_WORD_FULFILLED, payload: { words } });
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteWord, isLoading, isError };
};

export default useDeleteWord;
