import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      setErrors(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {errors ? (
        <p className="text-red-500">{errors}</p>
      ) : (
        <div>
          {products.map((product) => (
            <Link to={"/product"} state={{ product: product }}>
              <div
                className="p-5 bg-gray-400 hover:shadow-2xl m-4 cursor-pointer"
                key={product._id}
              >
                {product.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
