import { useNavigate } from "react-router-dom";

import { BookmarkList } from "../components/Bookmark";
import { Button, Paper, PaperTitle } from "../components/common";
import { GoBackIcon } from "../components/common/icons";

function Bookmark() {
  const navigate = useNavigate();

  return (
    <Paper
      width="100%"
      // width="100%"
      height="95%"
      // flex="1"
      bodyAlign="flex-start"
      paperHeader={
        <>
          <PaperTitle>
            Bookmark{" "}
            <Button onClick={() => navigate("/")} width="35px" height="35px">
              <GoBackIcon />
            </Button>
          </PaperTitle>
        </>
      }
    >
      <BookmarkList />
    </Paper>
  );
}

export default Bookmark;
