import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";

function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <p className="text-white text-2xl font-bold">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="bg-red-500 text-white px-6 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 px-6">
      
      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="mb-8 text-gray-300 hover:text-white"
      >
        ← Back to Products
      </button>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Image */}
        <div className="bg-zinc-900 rounded-xl overflow-hidden h-[380px] shadow-lg">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="bg-zinc-900 rounded-xl p-6 shadow-lg">

          <h2 className="text-2xl font-bold mb-6">
            Edit Product
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProduct(id);
            }}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label className="block mb-2 text-gray-400">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                className="w-full bg-black border border-gray-700 rounded-full px-4 py-3 outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 text-gray-400">
                Price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full bg-black border border-gray-700 rounded-full px-4 py-3 outline-none"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: e.target.value
                  })
                }
              />
            </div>

            {/* Image */}
            <div>
              <label className="block mb-2 text-gray-400">
                Image URL
              </label>

              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="w-full bg-black border border-gray-700 rounded-full px-4 py-3 outline-none"
                value={formData.image}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.value
                  })
                }
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-3 pt-4">

              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-500 py-3 rounded-full font-semibold hover:scale-105 transition"
              >
                Delete Product
              </button>

              <button
                type="submit"
                disabled={
                  loading ||
                  !formData.name ||
                  !formData.price ||
                  !formData.image
                }
                className="flex-1 bg-green-500 py-3 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ProductPage;