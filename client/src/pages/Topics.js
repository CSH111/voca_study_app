import { useState } from "react";
import { Link } from "react-router-dom";
import { ModalBg } from "../components/common/Modal";
import { StarIcon } from "../components/common/icons";
import {
  ProgressBar,
  TopicGenerator,
  TopicList,
  TopicListItem,
  TopicModal,
} from "../components/Topics";
import { PageContainer, Paper, PaperTitle } from "../components/common";

function Topics({}) {
  const [itemLoading, setItemLoading] = useState(false);
  // console.log(ModalBg);
  //페이지에서 데이터 받고 리스트로 넘겨주기. 리스트에서는 출력만 하게끔...

  return (
    <PageContainer>
      <TopicGenerator setItemLoading={setItemLoading} />
      <Paper width={"100%"}>
        <PaperTitle>My Topics</PaperTitle>
        <Link to={"/bookmark"} className="toBookmark">
          <StarIcon />
          북마크
        </Link>
        <TopicList itemLoading={itemLoading} />
        {/* <ModalBg /> */}
      </Paper>
    </PageContainer>
  );
}

export default Topics;
