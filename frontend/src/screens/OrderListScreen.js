import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ClipboardList, ExternalLink, CheckCircle, XCircle, User, Calendar, DollarSign } from 'lucide-react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <div className='pb-20'>
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center space-x-3'>
          <div className='p-3 bg-primary/10 text-primary rounded-2xl'>
            <ClipboardList size={28} />
          </div>
          <h1 className='text-3xl font-black text-gray-900'>System Orders</h1>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='bg-white rounded-3xl shadow-premium border border-gray-100 overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className='bg-gray-50 border-b border-gray-100'>
                  <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Order ID</th>
                  <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Customer</th>
                  <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Date</th>
                  <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Total</th>
                  <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Paid</th>
                  <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Delivered</th>
                  <th className='px-6 py-4'></th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {orders.map((order) => (
                  <tr key={order._id} className='hover:bg-gray-50/50 transition-colors group'>
                    <td className='px-6 py-4 text-sm font-medium text-gray-400'>#{order._id.substring(0, 8)}</td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center space-x-2'>
                        <User size={14} className='text-gray-400' />
                        <span className='text-sm font-bold text-gray-900'>{order.user && order.user.name}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center space-x-2'>
                        <Calendar size={14} className='text-gray-400' />
                        <span className='text-sm text-gray-500 font-medium'>{order.createdAt.substring(0, 10)}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center space-x-1'>
                        <DollarSign size={14} className='text-gray-400' />
                        <span className='text-sm font-black text-gray-900'>{order.totalPrice}</span>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      {order.isPaid ? (
                        <span className='inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100'>
                          <CheckCircle size={12} className='mr-1' /> {order.paidAt.substring(0, 10)}
                        </span>
                      ) : (
                        <span className='inline-flex items-center px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100'>
                          <XCircle size={12} className='mr-1' /> Unpaid
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      {order.isDelivered ? (
                        <span className='inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100'>
                          <CheckCircle size={12} className='mr-1' /> {order.deliveredAt.substring(0, 10)}
                        </span>
                      ) : (
                        <span className='inline-flex items-center px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-100'>
                          <XCircle size={12} className='mr-1' /> Pending
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <Link
                        to={`/order/${order._id}`}
                        className='inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded-lg text-xs font-bold text-gray-700 transition-all duration-300'
                      >
                        <ExternalLink size={14} className='mr-1.5' />
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderListScreen
