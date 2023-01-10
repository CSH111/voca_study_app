import { Button, Paper, PaperTitle } from "../components/common";
import { AddIcon } from "../components/common/icons";
import Modal from "../components/common/Modal";
import { BookMarkListItem, TopicGenerator, TopicList } from "../components/Topics";
import { useModal } from "../context";

function Topics() {
  //페이지에서 데이터 받고 리스트로 넘겨주기. 리스트에서는 출력만 하게끔...
  const handleAddModalOpen = () => {
    openModal(
      <Modal>
        <TopicGenerator />
      </Modal>
    );
  };
  const { openModal } = useModal();

  return (
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
  );
}

export default Topics;
