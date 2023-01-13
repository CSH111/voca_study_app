import styled from "styled-components";

import Button from "./Button";

const RectangularButton = styled(Button)`
  border-radius: 0;

  /* height: 45px;
  min-width: 100px;
  border: none;
  transition: all, 0.15s;
  background-color: #d3d3d3;
  cursor: ${(p) => (p.disabled ? "auto" : "pointer")};
  &:hover {
    background-color: ${(p) => (p.disabled ? "auto" : "coral")};
  }
  font-size: 16px; */
`;

export default RectangularButton;
