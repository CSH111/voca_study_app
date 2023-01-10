import { Spinner } from "../../components/common/icons";
import List from "../../components/common/Lists/List";
import { useWordbookSelector } from "../../context/WordbookContext";
import { EmptyMsgBox } from "../common";
import TopicListItem from "./TopicListItem";
//TODO 로딩끝나고 렌더링되는데 일부 계산된 데이터들 한박자 늦게 생성되는 이유 찾기

const TopicList = () => {
  const { topics, isLoading } = useWordbookSelector();

  const listItems = topics.length ? (
    topics.map((topic) => <TopicListItem topic={topic} key={topic._id} />)
  ) : (
    <EmptyMsgBox>토픽을 추가하세요</EmptyMsgBox>
  );

  return (
    <List>
      {isLoading && (
        <div className="list-spinner">
          <Spinner />
        </div>
      )}
      {!isLoading && listItems}
    </List>
  );
};

export default TopicList;
