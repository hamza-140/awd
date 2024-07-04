import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
        <nav>
          <ul className="flex justify-center space-x-4 p-4 bg-gray-200">
            <li>
              <Link to="/" className="text-blue-500">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-500">About</Link>
            </li>
            <li>
              <Link to="/products" className="text-blue-500">Products</Link>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar