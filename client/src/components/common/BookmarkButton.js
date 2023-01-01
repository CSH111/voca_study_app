import styled from "styled-components";
import Button from "./Button";

const BookmarkButton = styled(Button)`
  color: ${({ isBookmarked }) => (isBookmarked ? "#ffcc11ff" : "#d7d7d7ff")};
`;

export default BookmarkButton;
