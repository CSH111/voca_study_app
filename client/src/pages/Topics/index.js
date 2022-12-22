import { useState } from "react";
import { Link } from "react-router-dom";
import TopicGenerator from "./TopicGenerator";
import TopicList from "./TopicList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopicModal from "./TopicModal";
import { ModalBg } from "../../components/common/Modal";
// import { ModalBg } from "../../components/common/Modal/ModalBg";

function Topics({}) {
  const [itemLoading, setItemLoading] = useState(false);
  // console.log(ModalBg);
  //페이지에서 데이터 받고 리스트로 넘겨주기. 리스트에서는 출력만 하게끔...

  return (
    <>
      <TopicGenerator setItemLoading={setItemLoading} />
      <Link to={"/bookmark"} className="toBookmark">
        <FontAwesomeIcon icon={["fas", "star"]} /> my bookmark
      </Link>
      <TopicList itemLoading={itemLoading} />
      {/* <ModalBg /> */}
    </>
  );
}

export default Topics;
