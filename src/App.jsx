import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import AddProduct from "./AddProduct";
import Pokemon from "./Pokemon";
import Navbar from "./Navbar";
import DetailedProduct from "./DetailedProduct";
import Awd from "./Awd";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/awd" element={<Awd />} />
          <Route path="/pokemon" element={<Pokemon />} />
          <Route path="/product" element={<DetailedProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
