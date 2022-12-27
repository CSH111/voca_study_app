import { useNavigate } from "react-router-dom";

import { BookmarkList } from "../components/Bookmark";
import Button from "../components/common/Button";
import { GoBackIcon } from "../components/common/icons";

function Bookmark() {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate("/")}>
        <GoBackIcon />
      </Button>
      <BookmarkList />
    </>
  );
}

export default Bookmark;
