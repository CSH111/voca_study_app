import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  * {
    box-sizing: border-box;
  }

  *:not(path, svg) {
    box-sizing: border-box;
    color: ${(p) => p.theme.fontColor.primary.main}
  }
  a {
    text-decoration: none;
    color: inherit;
  }

`;

export default GlobalStyles;
