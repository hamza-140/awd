import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Pokemon from "./Pokemon";
import Navbar from "./Navbar";
import DetailedProduct from "./DetailedProduct";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/product" element={<DetailedProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
