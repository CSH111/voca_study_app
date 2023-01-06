import { useState } from "react";
import { wordbookActionType as WAT } from "../constants";
import { useWordbookDispatch } from "../context/WordbookContext";
import { wordbookService } from "../services";

const usePostWord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useWordbookDispatch();

  const postWord = async (body) => {
    setIsLoading(true);

    try {
      const res = await wordbookService.postWord(body);
      dispatch({ type: WAT.POST_WORD_FULFILLED, payload: res.data.words });
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { postWord, isLoading, isError };
};

export default usePostWord;
