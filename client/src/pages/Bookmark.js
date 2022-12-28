import { useNavigate } from "react-router-dom";

import { BookmarkList } from "../components/Bookmark";
import { PageContainer, Paper, PaperTitle } from "../components/common";
import Button from "../components/common/Button";
import { GoBackIcon } from "../components/common/icons";

function Bookmark() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Paper
        width="100%"
        flex="1"
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
    </PageContainer>
  );
}

export default Bookmark;
