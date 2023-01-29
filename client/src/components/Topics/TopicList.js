import { Spinner } from "../../components/common/icons";
import { useWordbookSelector } from "../../context/WordbookContext";
import { EmptyMsgBox, List } from "../common";
import { BookmarkTopicListItem, TopicListItem } from "./";

const TopicList = () => {
  const { topics, isLoading } = useWordbookSelector();

  const listItems = topics.length ? (
    topics.map((topic) => <TopicListItem topic={topic} key={topic._id} />)
  ) : (
    <EmptyMsgBox>생성된 토픽이 없습니다.</EmptyMsgBox>
  );

  return (
    <List>
      {isLoading && (
        <div className="list-spinner">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <>
          <BookmarkTopicListItem />
          {listItems}
        </>
      )}
    </List>
  );
};

export default TopicList;
