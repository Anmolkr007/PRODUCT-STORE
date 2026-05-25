import React from 'react'
import { useProductStore } from '../store/useProductStore.js'
import Card from '../component/Card.jsx'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <div className="min-h-screen bg-black text-white mt-16 p-8">

      {/* Buttons */}
      <div className="flex justify-between items-center mb-10">

        <button onClick={() => navigate('/addProduct')} className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
          Add Product
        </button>

        <button
          onClick={fetchProducts}
          className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
        >
          Refresh
        </button>

      </div>

      {/* Loading Center */}
      {loading && (
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-3xl font-bold">
            Loading...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex justify-center mt-10">
          <p className="text-red-500 text-xl">
            {error}
          </p>
        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {!loading && !error && products.length === 0 && (
  <div className="flex justify-center items-center h-[60vh]">
    <p className="text-3xl font-bold text-gray-400">
      No Products Found
    </p>
  </div>
)}





          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}

        </div>
      )}

    </div>
  )
}

export default HomePage