import { Spinner } from "../../components/common/icons";
import { useWordbookSelector } from "../../context/WordbookContext";
import { EmptyMsgBox, List } from "../common";
import { BookmarkTopicListItem, TopicListItem } from "./";

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
