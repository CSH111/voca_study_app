import { useState } from "react";
import { wordbookActionType as WAT } from "../constants";
import { useWordbookDispatch } from "../context/WordbookContext";
import { wordbookService } from "../services";

const usePatchWord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useWordbookDispatch();

  const patchWord = async (id, body) => {
    setIsLoading(true);
    try {
      const res = await wordbookService.patchWord(id, body);
      const { words } = res.data;
      dispatch({ type: WAT.PATCH_WORD_FULFILLED, payload: { words } });
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { patchWord, isLoading, isError };
};

export default usePatchWord;
