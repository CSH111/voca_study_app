import styled from "styled-components";

import Button from "./Button";

const BookmarkButton = styled(Button)`
  color: ${({ theme, isBookmarked }) =>
    isBookmarked ? theme.color.warning.main : theme.color.gray.main};
`;

export default BookmarkButton;
