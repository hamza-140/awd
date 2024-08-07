import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav>
        <ul className="flex justify-center space-x-4 p-4 bg-gray-200">
          <li>
            <Link to="/" className="text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add" className="text-blue-500">
              Add
            </Link>
          </li>
          <li>
            <Link to="/awd" className="text-blue-500">
              Awd
            </Link>
          </li>
          <li>
            <Link to="/pokemon" className="text-blue-500">
              Pokemon
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
