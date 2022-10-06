import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BookmarkList from "./BookmarkList";
import Button from "../../components/common/Button";

function Bookmark() {
  const navigate = useNavigate();

  return (
    <>
      <hr />
      북마크페이지
      <Button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" />
      </Button>
      <BookmarkList />
    </>
  );
}

export default Bookmark;
