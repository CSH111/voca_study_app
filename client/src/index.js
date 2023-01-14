import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { AuthContextProvider, ModalProvider, WordbookProvider } from "./context";
import { GlobalStyles, theme } from "./styles";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <WordbookProvider>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <GlobalStyles />
            <App />
          </ModalProvider>
        </ThemeProvider>
      </WordbookProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
