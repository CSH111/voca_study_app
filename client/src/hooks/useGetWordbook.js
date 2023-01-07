import { wordbookActionType as WAT } from "../constants";
import { useWordbookDispatch } from "../context";
import { wordbookService } from "../services";

const useGetWordbook = () => {
  const dispatch = useWordbookDispatch();

  const getWordbook = async () => {
    dispatch({ type: WAT.GET_WORDBOOK_PENDING });
    const { getTopics, getWords } = wordbookService;

    try {
      const [topicsRes, wordsRes] = await Promise.all([getTopics(), getWords()]);
      const [topics, words] = [topicsRes.data.topics, wordsRes.data.words];
      dispatch({ type: WAT.GET_WORDBOOK_FULFILLED, payload: { topics, words } });
    } catch (err) {
      dispatch({ type: WAT.GET_WORDBOOK_REJECTED });
    }
  };

  return getWordbook;
};

export default useGetWordbook;
