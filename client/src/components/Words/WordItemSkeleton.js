import styled from "styled-components";

import { Spinner } from "../common/icons";
import ListItem from "../common/Lists/ListItem";

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
