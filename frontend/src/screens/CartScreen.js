import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <div className='pb-20'>
      <h1 className='text-3xl font-black text-gray-900 mb-8'>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className='bg-white rounded-3xl p-12 text-center shadow-premium border border-gray-100'>
          <div className='inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full text-gray-400 mb-6'>
            <ShoppingBag size={40} />
          </div>
          <h2 className='text-xl font-bold text-gray-900 mb-2'>Your cart is empty</h2>
          <p className='text-gray-500 mb-8'>Looks like you haven't added anything to your cart yet.</p>
          <Link
            to='/'
            className='inline-flex items-center bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl'
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          {/* Cart Items */}
          <div className='lg:col-span-8 space-y-6'>
            {cartItems.map((item) => (
              <div
                key={item.product}
                className='bg-white rounded-2xl p-4 sm:p-6 shadow-premium border border-gray-100 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 group hover:border-primary-light transition-colors duration-300'
              >
                <div className='w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                </div>

                <div className='flex-grow text-center sm:text-left'>
                  <Link
                    to={`/product/${item.product}`}
                    className='text-lg font-bold text-gray-900 hover:text-primary transition-colors line-clamp-1'
                  >
                    {item.name}
                  </Link>
                  <p className='text-primary font-black mt-1'>${item.price}</p>
                </div>

                <div className='flex items-center space-x-4'>
                  <div className='flex items-center bg-gray-50 rounded-lg p-1'>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, Number(e.target.value)))
                      }
                      className='bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer px-2'
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => removeFromCartHandler(item.product)}
                    className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300'
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-4'>
            <div className='bg-white rounded-3xl p-8 shadow-premium border border-gray-100 sticky top-24'>
              <h2 className='text-xl font-black text-gray-900 mb-6'>Order Summary</h2>

              <div className='space-y-4 mb-8'>
                <div className='flex justify-between text-gray-500 font-medium'>
                  <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                  <span>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between text-gray-500 font-medium'>
                  <span>Shipping</span>
                  <span className='text-green-600 font-bold'>Free</span>
                </div>
                <div className='pt-4 border-t border-gray-50 flex justify-between items-center'>
                  <span className='text-lg font-bold text-gray-900'>Total</span>
                  <span className='text-2xl font-black text-primary'>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300 transform active:scale-95 ${cartItems.length > 0
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <span>Checkout</span>
                <ArrowRight size={20} />
              </button>

              <p className='mt-6 text-center text-xs text-gray-400'>
                Tax calculated at checkout. Secure SSL encrypted payment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartScreen
