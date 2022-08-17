import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
const StyledDiv = styled.div``;

const Ellipsis = (props) => {
  return (
    <StyledDiv>
      <Button className="ellipsisBtn">
        <FontAwesomeIcon icon={faEllipsis} />
      </Button>

      <div className="items">{props.items}</div>
    </StyledDiv>
  );
};

export default Ellipsis;
