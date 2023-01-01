import { useWordbook } from "../../services/WordbookContext";
import TopicListItem from "./TopicListItem";
import styled from "styled-components";
import { Spinner } from "../../components/common/icons";
import List from "../../components/common/Lists/List";

const StyledList = styled(List)`
  position: relative;
  flex: 1;
  > .spinner {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 2.5rem;
  }
`;
const TopicList = () => {
  const {
    topicsData: { topics, loading },
  } = useWordbook();

  const listItems = topics.length ? (
    topics.map((topic) => <TopicListItem topic={topic} key={topic._id} />)
  ) : (
    <div>토픽을 추가하세요</div>
  );

  return (
    <StyledList>
      {loading && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      {!loading && listItems}
    </StyledList>
  );
};

export default TopicList;
