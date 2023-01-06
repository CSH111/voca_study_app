import { useWordbookSelector } from "../../context/WordbookContext";
import TopicListItem from "./TopicListItem";
import styled from "styled-components";
import { Spinner } from "../../components/common/icons";
import List from "../../components/common/Lists/List";
//TODO 로딩끝나고 렌더링되는데 일부 계산된 데이터들 한박자 늦게 생성되는 이유 찾기

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
  const { topics } = useWordbookSelector();

  const listItems = topics.length ? (
    topics.map((topic) => <TopicListItem topic={topic} key={topic._id} />)
  ) : (
    <div>토픽을 추가하세요</div>
  );
  const isLoading = false;

  return (
    <StyledList>
      {isLoading && (
        <div className="spinner">
          <Spinner />
        </div>
      )}
      {!isLoading && listItems}
    </StyledList>
  );
};

export default TopicList;
