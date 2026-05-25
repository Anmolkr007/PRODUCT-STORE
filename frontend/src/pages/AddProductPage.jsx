import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

const AddProductPage = () => {
  const {
    formData,
    setFormData,
    addProduct,
    loading
  } = useProductStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addProduct();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-6 flex justify-center">

      <div className="w-full max-w-lg bg-zinc-900 rounded-2xl p-8 shadow-xl">

        {/* Top */}
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Add New Product
          </h1>

          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Product Name */}
          <div>
            <label className="block mb-2 text-gray-400">
              Product Name
            </label>

            <input
              type="text"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
              className="w-full bg-black border border-gray-700 rounded-full px-5 py-3 outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-gray-400">
              Price
            </label>

            <input
              type="number"
              placeholder="00"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value
                })
              }
              className="w-full bg-black border border-gray-700 rounded-full px-5 py-3 outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 text-gray-400">
              Image URL
            </label>

            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.value
                })
              }
              className="w-full bg-black border border-gray-700 rounded-full px-5 py-3 outline-none"
            />
          </div>

          {/* Bottom buttons */}
          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                !formData.name ||
                !formData.price ||
                !formData.image
              }
              className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 hover:scale-105 transition"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddProductPage;