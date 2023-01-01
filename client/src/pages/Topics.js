import { useState } from "react";
import { BookMarkListItem, TopicGenerator, TopicList } from "../components/Topics";
import { Button, PageContainer, Paper, PaperTitle } from "../components/common";
import { AddIcon } from "../components/common/icons";
import Modal from "../components/common/Modal";
import { useContext } from "react";
import { DataContext } from "../services/DataContext";
//TODO: 페이지에서 topic url 입력이동시 버그
function Topics() {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  //페이지에서 데이터 받고 리스트로 넘겨주기. 리스트에서는 출력만 하게끔...
  const store = useContext(DataContext);
  const handleAddModalOpen = () => {
    setIsAddModalOpened(true);
  };

  return (
    <PageContainer align="flex-start">
      <Paper
        width={"100%"}
        flex="1"
        paperHeader={
          <PaperTitle>
            My Topics{" "}
            <Button onClick={handleAddModalOpen}>
              <AddIcon />
            </Button>
          </PaperTitle>
        }
        bodyAlign="flex-start"
      >
        <BookMarkListItem />
        <TopicList />
      </Paper>
      <Modal
        isOpen={isAddModalOpened}
        setIsOpen={setIsAddModalOpened}
        isLoading={store.topicsData.loading}
      >
        <TopicGenerator />
      </Modal>
    </PageContainer>
  );
}

export default Topics;
