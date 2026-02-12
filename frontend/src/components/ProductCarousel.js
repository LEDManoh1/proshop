import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const [index, setIndex] = useState(0)
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  useEffect(() => {
    if (products && products.length > 0) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % products.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [products])

  const nextStep = () => {
    setIndex((prev) => (prev + 1) % products.length)
  }

  const prevStep = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  if (loading) return <Loader />
  if (error) return <Message variant='danger'>{error}</Message>
  if (!products || products.length === 0) return null

  return (
    <div className='relative w-full h-[500px] overflow-hidden rounded-3xl group shadow-premium'>
      <AnimatePresence initial={false} mode='wait'>
        <motion.div
          key={products[index]._id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className='absolute inset-0'
        >
          <Link to={`/product/${products[index]._id}`}>
            <img
              src={`${process.env.REACT_APP_API_URL || ''}${products[index].image}`}
              alt={products[index].name}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://picsum.photos/seed/' + products[index]._id + '/1200/500'
              }}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-12 sm:px-20'>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='text-primary font-bold tracking-widest uppercase text-sm mb-4'
              >
                Top Rated Product
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='text-white text-4xl sm:text-6xl font-black mb-6 max-w-xl leading-tight'
              >
                {products[index].name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className='text-white/80 text-lg mb-8 max-w-md'
              >
                Experience the pinnacle of technology. Get yours today for just <span className='text-white font-bold text-2xl'>${products[index].price}</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className='inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg'>
                  Shop Now
                </div>
              </motion.div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevStep}
        className='absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-primary'
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextStep}
        className='absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white hover:text-primary'
      >
        <ChevronRight size={24} />
      </button>

      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2'>
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel
