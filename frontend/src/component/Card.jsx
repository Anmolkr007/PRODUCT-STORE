import React from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore.js'

const Card = (props) => {
  const { deleteProduct } = useProductStore()

  return (
    <div className="bg-black text-white w-72 h-96 rounded-xl overflow-hidden shadow-lg border border-gray-700">

      {/* Image section */}
      <div className="h-[55%]">
        <img
          src={props.image}
          alt={props.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details + buttons */}
      <div className="h-[45%] p-4 flex flex-col justify-between">

        <div>
          <div className="text-xl font-bold">
            {props.name}
          </div>

          <div className="text-lg mt-2">
            ₹{props.price}
          </div>
        </div>

        <div className="flex gap-3">

          <Link
            to={`/products/${props.id}`}
            className="flex-1 bg-white text-black py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            Edit
          </Link>

          <button onClick={()=>{
            deleteProduct(props.id)
          }} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold">
            Delete
          </button>

        </div>

      </div>
    </div>
  )
}

export default Card