import { useState } from "react";
import { BookMarkListItem, TopicGenerator, TopicList } from "../components/Topics";
import { PageContainer, Paper, PaperTitle } from "../components/common";

function Topics({}) {
  const [itemLoading, setItemLoading] = useState(false);
  // console.log(ModalBg);
  //페이지에서 데이터 받고 리스트로 넘겨주기. 리스트에서는 출력만 하게끔...

  return (
    <PageContainer>
      <TopicGenerator setItemLoading={setItemLoading} />
      <Paper width={"100%"} paperHeader={<PaperTitle>My Topics</PaperTitle>} bodyAlign="flex-start">
        <BookMarkListItem />
        <TopicList itemLoading={itemLoading} />
      </Paper>
    </PageContainer>
  );
}

export default Topics;
