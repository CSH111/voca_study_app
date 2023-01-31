import { Button, Devider, Modal, Paper, PaperTitle } from "../components/common";
import { AddIcon } from "../components/common/icons";
import { TopicGenerator, TopicList } from "../components/Topics";
import { useModal } from "../context";

function Topics() {
  const { openModal } = useModal();

  const handleAddModalOpen = () => {
    openModal(
      <Modal title="토픽생성">
        <TopicGenerator />
      </Modal>
    );
  };
  return (
    <Paper
      width="100%"
      height="95%"
      bigPage
      paperHeader={
        <>
          <PaperTitle>My Topics </PaperTitle>
          <Button onClick={handleAddModalOpen} padding="5px 8px">
            <AddIcon />
          </Button>
        </>
      }
      paperFooter={<Devider margin="15px 0 0 0 " width="2px" />}
      bodyAlign="flex-start"
    >
      <Devider margin="0 0 15px 0" color="black" width="2px" />
      <TopicList />
    </Paper>
  );
}

export default Topics;
