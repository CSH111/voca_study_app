import { useState } from "react";
import { BookMarkListItem, TopicGenerator, TopicList } from "../components/Topics";
import { Button, PageContainer, Paper, PaperTitle } from "../components/common";
import { AddIcon } from "../components/common/icons";
import Modal from "../components/common/Modal";

function Topics({}) {
  const [itemLoading, setItemLoading] = useState(false);
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  // console.log(ModalBg);
  //페이지에서 데이터 받고 리스트로 넘겨주기. 리스트에서는 출력만 하게끔...

  const handleAddModalOpen = () => {
    console.log("open");
    setIsAddModalOpened(true);
  };

  return (
    <PageContainer align="flex-start">
      {isAddModalOpened && (
        <Modal state={isAddModalOpened} setState={setIsAddModalOpened}>
          <TopicGenerator setItemLoading={setItemLoading} />
        </Modal>
      )}
      <TopicGenerator setItemLoading={setItemLoading} />
      <Paper
        width={"100%"}
        flex="1"
        paperHeader={
          <PaperTitle>
            My Topics{" "}
            <Button onClick={handleAddModalOpen} width="35px" height="35px">
              <AddIcon />
            </Button>
          </PaperTitle>
        }
        bodyAlign="flex-start"
      >
        <BookMarkListItem />
        <TopicList itemLoading={itemLoading} />
      </Paper>
    </PageContainer>
  );
}

export default Topics;
