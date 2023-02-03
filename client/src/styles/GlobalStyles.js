import "./fonts.css";

import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  body {
    font-family: "open-sans", "noto-sans-kr", "sans-serif";
  }
  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color:${(p) => p.theme.color.secondary.main}
  }
  * {
    box-sizing: border-box;
    font-family:inherit;
  }
  h1,h2,h3,h4,div{
    line-height: normal;
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
