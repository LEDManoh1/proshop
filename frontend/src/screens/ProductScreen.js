import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft, ShoppingCart, Check, X, Star } from 'lucide-react'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product?._id || product?._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match.params.id, successProductReview, product?._id])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <div className='pb-20'>
      <Link
        className='inline-flex items-center text-sm font-semibold text-gray-500 hover:text-primary transition-colors mb-8 group'
        to='/'
      >
        <ArrowLeft size={16} className='mr-2 group-hover:-translate-x-1 transition-transform' />
        Back to Results
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            {/* Product Image */}
            <div className='lg:col-span-7'>
              <div className='bg-white rounded-3xl overflow-hidden shadow-premium border border-gray-100 h-[450px]'>
                <img
                  src={`${process.env.REACT_APP_API_URL || ''}${product.image}`}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/600x400?text=Product+Image'
                  }}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>

            {/* Product Details & Purchase Card */}
            <div className='lg:col-span-5 space-y-8'>
              <div className='space-y-4'>
                <h1 className='text-4xl font-black text-gray-900 leading-tight'>
                  {product.name}
                </h1>
                <div className='flex items-center space-x-4'>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} verified reviews`}
                  />
                </div>
                <p className='text-3xl font-black text-primary'>${product.price}</p>
                <div className='pt-4 border-t border-gray-100'>
                  <h3 className='text-sm font-bold text-gray-900 uppercase tracking-widest mb-2'>Description</h3>
                  <p className='text-gray-600 leading-relaxed'>{product.description}</p>
                </div>
              </div>

              {/* Purchase Card */}
              <div className='bg-white rounded-2xl p-6 shadow-premium border border-gray-100 space-y-6'>
                <div className='flex justify-between items-center pb-4 border-b border-gray-50'>
                  <span className='text-gray-500 font-medium'>Price</span>
                  <span className='text-xl font-bold text-gray-900'>${product.price}</span>
                </div>

                <div className='flex justify-between items-center pb-4 border-b border-gray-50'>
                  <span className='text-gray-500 font-medium'>Availability</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${product.countInStock > 0
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                    }`}>
                    {product.countInStock > 0 ? (
                      <><Check size={14} className='mr-1' /> In Stock</>
                    ) : (
                      <><X size={14} className='mr-1' /> Out Of Stock</>
                    )}
                  </span>
                </div>

                {product.countInStock > 0 && (
                  <div className='flex justify-between items-center pb-4 border-b border-gray-50'>
                    <span className='text-gray-500 font-medium'>Quantity</span>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className='bg-gray-50 border-none rounded-lg text-sm font-bold py-1 px-3 focus:ring-2 focus:ring-primary'
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 transform active:scale-95 ${product.countInStock > 0
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  <ShoppingCart size={20} />
                  <span>Add To Cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className='mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16'>
            <div>
              <h2 className='text-3xl font-black text-gray-900 mb-8'>Customer Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant='info'>No reviews yet. Be the first to share your thoughts!</Message>
              )}
              <div className='space-y-8'>
                {product.reviews.map((review) => (
                  <div key={review._id} className='bg-white p-6 rounded-2xl border border-gray-50 hover:border-gray-100 transition-colors shadow-sm'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <p className='font-bold text-gray-900'>{review.name}</p>
                        <p className='text-xs text-gray-400'>{review.createdAt.substring(0, 10)}</p>
                      </div>
                      <Rating value={review.rating} />
                    </div>
                    <p className='text-gray-600 italic'>"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-gray-50 p-8 rounded-3xl'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Write a Review</h2>
              {successProductReview && (
                <Message variant='success'>Review submitted successfully</Message>
              )}
              {loadingProductReview && <Loader />}
              {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

              {userInfo ? (
                <form onSubmit={submitHandler} className='space-y-6'>
                  <div>
                    <label className='block text-sm font-bold text-gray-700 mb-2'>Rating</label>
                    <div className='flex space-x-2'>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          type='button'
                          key={num}
                          onClick={() => setRating(num)}
                          className={`p-2 rounded-lg transition-all ${rating >= num ? 'text-primary scale-110' : 'text-gray-300'}`}
                        >
                          <Star size={24} fill={rating >= num ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-bold text-gray-700 mb-2'>Your Comment</label>
                    <textarea
                      rows='4'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder='Tell us what you think about this product...'
                      className='w-full bg-white border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary shadow-sm'
                    ></textarea>
                  </div>
                  <button
                    disabled={loadingProductReview}
                    type='submit'
                    className='bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition-colors disabled:opacity-50'
                  >
                    Post Review
                  </button>
                </form>
              ) : (
                <div className='text-center py-6'>
                  <p className='text-gray-500 mb-4'>You need to be signed in to post a review.</p>
                  <Link to='/login' className='inline-block bg-primary text-white px-6 py-2 rounded-lg font-bold'>Sign In</Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductScreen
