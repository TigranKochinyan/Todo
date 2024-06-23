import React from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Trash from "./pages/Trash/Trash";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </div>
  );
}

export default App;
