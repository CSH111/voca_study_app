import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookmarkList } from "../components/Bookmark";
import Button from "../components/common/Button";

function Bookmark() {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/")}>
        <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" />
      </Button>
      <BookmarkList />
    </>
  );
}

export default Bookmark;
