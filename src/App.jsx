import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import AllProducts from './AllProducts'
import Navbar from './Navbar'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<AllProducts />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
