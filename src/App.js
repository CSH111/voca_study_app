import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Create } from "./routes/Create";
import { Detail } from "./routes/Detail";
import { Home } from "./routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:topic" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
