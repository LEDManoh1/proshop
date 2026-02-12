import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MapPin, CreditCard, ShoppingBag, CheckCircle, XCircle, Clock } from 'lucide-react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const [sdkReady, setSdkReady] = useState(false)
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading && order) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  if (loading) return <Loader />
  if (error) return <Message variant='danger'>{error}</Message>

  const sectionHeaderClasses = 'flex items-center space-x-2 text-xl font-black text-gray-900 mb-4'
  const cardClasses = 'bg-white rounded-3xl p-6 sm:p-8 shadow-premium border border-gray-100'

  return (
    <div className='pb-20'>
      <div className='flex flex-col sm:flex-row items-center justify-between mb-8'>
        <h1 className='text-3xl font-black text-gray-900'>Order #{order._id.substring(0, 8)}...</h1>
        <div className='mt-4 sm:mt-0 flex space-x-2'>
          {order.isPaid ? (
            <span className='inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-bold border border-green-100'>
              <CheckCircle size={16} className='mr-2' /> Paid
            </span>
          ) : (
            <span className='inline-flex items-center px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-bold border border-amber-100'>
              <Clock size={16} className='mr-2' /> Pending Payment
            </span>
          )}
          {order.isDelivered ? (
            <span className='inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100'>
              <CheckCircle size={16} className='mr-2' /> Delivered
            </span>
          ) : (
            <span className='inline-flex items-center px-4 py-1.5 rounded-full bg-gray-50 text-gray-500 text-sm font-bold border border-gray-100'>
              <Truck size={16} className='mr-2' /> In Transit
            </span>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 space-y-8'>
          {/* Shipping Section */}
          <div className={cardClasses}>
            <div className={sectionHeaderClasses}>
              <MapPin size={24} className='text-primary' />
              <h2>Shipping Details</h2>
            </div>
            <div className='bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3'>
              <p className='text-gray-700 font-bold'>{order.user.name}</p>
              <p className='text-gray-500 text-sm'>{order.user.email}</p>
              <p className='text-gray-700'>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              <div className='pt-2'>
                {order.isDelivered ? (
                  <Message variant='success'>Delivered on {order.deliveredAt.substring(0, 10)}</Message>
                ) : (
                  <Message variant='warning'>Awaiting delivery</Message>
                )}
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className={cardClasses}>
            <div className={sectionHeaderClasses}>
              <CreditCard size={24} className='text-primary' />
              <h2>Payment Status</h2>
            </div>
            <div className='bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3'>
              <p className='text-gray-700'>
                <strong>Method: </strong>{order.paymentMethod}
              </p>
              <div className='pt-2'>
                {order.isPaid ? (
                  <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message>
                ) : (
                  <Message variant='danger'>Payment not received</Message>
                )}
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className={cardClasses}>
            <div className={sectionHeaderClasses}>
              <ShoppingBag size={24} className='text-primary' />
              <h2>Order Items</h2>
            </div>
            <div className='space-y-4'>
              {order.orderItems.map((item, index) => (
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
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className='lg:col-span-4'>
          <div className='bg-white rounded-3xl p-8 shadow-premium border border-gray-100 sticky top-24'>
            <h2 className='text-2xl font-black text-gray-900 mb-8'>Order Summary</h2>

            <div className='space-y-4 mb-8'>
              <div className='flex justify-between text-gray-500 font-medium'>
                <span>Items Subtotal</span>
                <span className='text-gray-900 font-bold'>${order.itemsPrice}</span>
              </div>
              <div className='flex justify-between text-gray-500 font-medium'>
                <span>Shipping Fee</span>
                <span className='text-gray-900 font-bold'>${order.shippingPrice}</span>
              </div>
              <div className='flex justify-between text-gray-500 font-medium'>
                <span>Tax</span>
                <span className='text-gray-900 font-bold'>${order.taxPrice}</span>
              </div>
              <div className='pt-6 border-t border-gray-50 flex justify-between items-center'>
                <span className='text-xl font-bold text-gray-900'>Total</span>
                <span className='text-3xl font-black text-primary'>${order.totalPrice}</span>
              </div>
            </div>

            {!order.isPaid && (
              <div className='mt-8 pt-6 border-t border-gray-100'>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </div>
            )}

            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <button
                type='button'
                onClick={deliverHandler}
                className='w-full py-4 bg-gray-900 text-white rounded-2xl font-black shadow-lg hover:shadow-xl hover:bg-primary transition-all duration-300 transform active:scale-[0.98] mt-4'
              >
                Mark As Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Truck = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 17h4V5H2v12h3" />
    <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L17 7h-3v10" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
)

export default OrderScreen
