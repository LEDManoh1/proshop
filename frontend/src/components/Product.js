import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import Rating from './Rating'

const Product = ({ product }) => {
  const API_URL = process.env.REACT_APP_API_URL || ''
  const fallbackImage = 'https://via.placeholder.com/600x400?text=Product+Image'

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className='group relative bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-shadow duration-300'
    >
      <Link to={`/product/${product._id}`} className='relative block h-[220px] w-full overflow-hidden bg-gray-100'>
        <img
          src={`${API_URL}${product.image}`}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = fallbackImage
          }}
          className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500'
        />
        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300' />
      </Link>

      <div className='p-5'>
        <Link to={`/product/${product._id}`}>
          <h3 className='text-gray-900 font-bold text-lg mb-1 truncate hover:text-primary transition-colors'>
            {product.name}
          </h3>
        </Link>

        <div className='mb-3'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-2xl font-black text-gray-900'>
            ${product.price}
          </span>
          <button className='p-2.5 rounded-full bg-gray-900 text-white hover:bg-primary hover:text-white transition-all duration-300 shadow-md transform hover:scale-110 active:scale-95'>
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Product
