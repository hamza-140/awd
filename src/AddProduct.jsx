import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);

  const handleAdd = async (e) => {
    e.preventDefault(); // Prevent form from submitting

    Swal.fire({
      title: "Are you sure?",
      text: "A new product will be added!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("http://localhost:5000/product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              desc: desc,
              category: category,
              quantity: quantity,
              color: color,
              price: price,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to add product");
          }

          Swal.fire({
            title: "Added!",
            text: "Your product has been added.",
            icon: "success",
          }).then(() => {
            navigate("/");
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  return (
    <div className="flex items-center flex-col justify-center h-[100vh]">
      <form onSubmit={handleAdd} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(t) => {
                setName(t.target.value);
              }}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Category
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              value={category}
              placeholder="Category"
              onChange={(t) => {
                setCategory(t.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-description"
            >
              Description
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-description"
              type="text"
              placeholder="Description of product"
              value={desc}
              onChange={(t) => {
                setDesc(t.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-color"
            >
              Color
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-color"
              type="text"
              placeholder="Color"
              value={color}
              onChange={(t) => {
                setColor(t.target.value);
              }}
              required
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-quantity"
            >
              Quantity
            </label>
            <div className="relative">
              <input
                type="number"
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-quantity"
                value={quantity}
                onChange={(t) => {
                  setQuantity(Number(t.target.value));
                }}
                required
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-price"
            >
              Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-price"
              type="number"
              value={price}
              placeholder="Price"
              onChange={(t) => {
                setPrice(Number(t.target.value));
              }}
              required
            />
          </div>
        </div>
        <div className="flex mt-2 justify-between">
          <button
            type="submit"
            className="bg-green-400 mr-40 hover:bg-green-500 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
          >
            Return
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
