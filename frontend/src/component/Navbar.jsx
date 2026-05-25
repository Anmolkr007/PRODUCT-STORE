import React from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore.js'



const Navbar = () => {
  const { products } = useProductStore();
  return (
    <div className="bg-black text-white flex justify-between items-center px-8 h-16 fixed top-0 left-0 w-full z-50">

      <Link
        to="/"
        className="text-2xl font-bold"
      >
        PRODUCTSTORE
      </Link>

      <div className="bg-white text-black px-4 py-1 rounded-md font-semibold">
        {products.length}
      </div>

    </div>
  )
}

export default Navbar