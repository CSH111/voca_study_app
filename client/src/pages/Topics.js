import { Button, Devider, Modal, Paper, PaperTitle } from "../components/common";
import { AddIcon } from "../components/common/icons";
import { TopicGenerator, TopicList } from "../components/Topics";
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
      width="100%"
      height="95%"
      forPage
      paperHeader={
        <>
          <PaperTitle>My Topics </PaperTitle>
          <Button onClick={handleAddModalOpen}>
            <AddIcon />
          </Button>
        </>
      }
      paperFooter={<Devider width="2px" />}
      bodyAlign="flex-start"
    >
      <Devider margin="0 0 15px 0" color="black" width="2px" />
      <TopicList />
    </Paper>
  );
}

export default Topics;
