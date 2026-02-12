import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MapPin, CreditCard, ShoppingBag, ArrowRight } from 'lucide-react'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  const sectionHeaderClasses = 'flex items-center space-x-2 text-xl font-black text-gray-900 mb-4'
  const cardClasses = 'bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-gray-100'

  return (
    <div className='pb-20'>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 space-y-8'>
          {/* Shipping Section */}
          <div className={cardClasses}>
            <div className={sectionHeaderClasses}>
              <MapPin size={24} className='text-primary' />
              <h2>Shipping</h2>
            </div>
            <div className='bg-gray-50 rounded-2xl p-4 border border-gray-100'>
              <p className='text-gray-700 font-medium'>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
              </p>
            </div>
          </div>

          {/* Payment Section */}
          <div className={cardClasses}>
            <div className={sectionHeaderClasses}>
              <CreditCard size={24} className='text-primary' />
              <h2>Payment Method</h2>
            </div>
            <div className='bg-gray-50 rounded-2xl p-4 border border-gray-100'>
              <p className='text-gray-700 font-medium'>
                <strong>Method: </strong>{cart.paymentMethod}
              </p>
            </div>
          </div>

          {/* Items Section */}
          <div className={cardClasses}>
            <div className={sectionHeaderClasses}>
              <ShoppingBag size={24} className='text-primary' />
              <h2>Order Items</h2>
            </div>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div className='space-y-4'>
                {cart.cartItems.map((item, index) => (
                  <div key={index} className='flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100'>
                        <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                      </div>
                      <div>
                        <Link to={`/product/${item.product}`} className='font-bold text-gray-900 hover:text-primary transition-colors line-clamp-1'>
                          {item.name}
                        </Link>
                        <p className='text-xs text-gray-400 font-medium'>{item.qty} x ${item.price}</p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-black text-gray-900'>${(item.qty * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className='lg:col-span-4'>
          <div className='bg-white rounded-3xl p-8 shadow-premium border border-gray-100 sticky top-24'>
            <h2 className='text-2xl font-black text-gray-900 mb-8'>Order Summary</h2>

            <div className='space-y-4 mb-8'>
              <div className='flex justify-between text-gray-500 font-medium'>
                <span>Items Price</span>
                <span className='text-gray-900 font-bold'>${cart.itemsPrice}</span>
              </div>
              <div className='flex justify-between text-gray-500 font-medium'>
                <span>Shipping</span>
                <span className={`${Number(cart.shippingPrice) === 0 ? 'text-green-600 font-black' : 'text-gray-900 font-bold'}`}>
                  {Number(cart.shippingPrice) === 0 ? 'Free' : `$${cart.shippingPrice}`}
                </span>
              </div>
              <div className='flex justify-between text-gray-500 font-medium'>
                <span>Tax (15%)</span>
                <span className='text-gray-900 font-bold'>${cart.taxPrice}</span>
              </div>
              <div className='pt-6 border-t border-gray-50 flex justify-between items-center'>
                <span className='text-xl font-bold text-gray-900'>Total</span>
                <span className='text-3xl font-black text-primary'>${cart.totalPrice}</span>
              </div>
            </div>

            {error && <Message variant='danger'>{error}</Message>}

            <button
              type='button'
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
              className='w-full py-4 bg-primary text-white rounded-2xl font-black shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center space-x-2'
            >
              <span>Place Order</span>
              <ArrowRight size={20} />
            </button>

            <p className='mt-6 text-center text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100'>
              By placing your order, you agree to ProShop's terms of use and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen
