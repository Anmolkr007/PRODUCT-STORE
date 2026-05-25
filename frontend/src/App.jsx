import React from 'react'
import Navbar from './component/Navbar.jsx'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import { Toaster } from 'react-hot-toast'
import AddProductPage from './pages/AddProductPage.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/addProduct" element={<AddProductPage />} />
        <Route path="*" element={
          <div className="min-h-screen bg-black flex justify-center items-center">
            <p className="text-white text-2xl font-bold">
              404 - Page Not Found
            </p>
          </div>
        } />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
      
