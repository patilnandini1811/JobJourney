
import HomePage from "../src/components/HomePage";
import CardTask from "./components/CardTask";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<HomePage />} />
   <Route path="/login" element={<LoginPage />} />
   <Route path="/application" element={<CardTask/>} />

      </Routes>
      </BrowserRouter>
  );
}

export default App;
