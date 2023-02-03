import { useNavigate } from "react-router-dom";

import { BookmarkList } from "../components/Bookmark";
import { Button, Devider, Paper, PaperTitle } from "../components/common";
import { GoBackIcon } from "../components/common/icons";

function Bookmark() {
  const navigate = useNavigate();

  return (
    <Paper
      width="100%"
      height="95%"
      bodyAlign="flex-start"
      bigPage
      paperHeader={
        <>
          <PaperTitle>Bookmark </PaperTitle>
          <Button onClick={() => navigate("/")} width="35px" height="35px">
            <GoBackIcon />
          </Button>
        </>
      }
    >
      <Devider margin="0 0 15px 0" color="black" width="2px" />

      <BookmarkList />
      <Devider margin="5px 0 0 0" color="black" width="2px" />
    </Paper>
  );
}

export default Bookmark;
