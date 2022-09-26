import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledSpinner = styled(FontAwesomeIcon)``;

const Spinner = ({ size, color }) => {
  return <StyledSpinner icon="fa-solid fa-circle-notch" spin />;
};

export default Spinner;
