import { useNavigate, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/common/Button";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import BookmarkList from "../components/Bookmark/BookmarkList";

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
