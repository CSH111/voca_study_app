import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthContextProvider, WordbookProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <WordbookProvider>
      <App />
    </WordbookProvider>
  </AuthContextProvider>
);
