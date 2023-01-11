import styled from "styled-components";

import { ListItem } from "../common";
import { Spinner } from "../common/icons";

const WordItemSkeleton = () => {
  return (
    <StyledListItem>
      <div className="spinner">
        <Spinner fontSize="20px" />
      </div>
    </StyledListItem>
  );
};

export default WordItemSkeleton;

const StyledListItem = styled(ListItem)`
  background-color: #e6e6e6;
`;
