import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { User, Mail, Lock, Save, ExternalLink, CheckCircle, XCircle } from 'lucide-react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  const inputClasses = 'w-full bg-gray-50 border-none rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300'
  const labelClasses = 'block text-sm font-bold text-gray-700 mb-2 ml-1'

  return (
    <div className='pb-20'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        {/* Profile Settings */}
        <div className='lg:col-span-4'>
          <div className='bg-white rounded-3xl p-8 shadow-premium border border-gray-100'>
            <div className='flex items-center space-x-3 mb-8'>
              <div className='p-3 bg-primary/10 text-primary rounded-2xl'>
                <User size={24} />
              </div>
              <h2 className='text-2xl font-black text-gray-900'>Profile</h2>
            </div>

            {message && <Message variant='danger'>{message}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <form onSubmit={submitHandler} className='space-y-6'>
                <div>
                  <label className={labelClasses}>Full Name</label>
                  <div className='relative'>
                    <User className='absolute left-4 top-3.5 text-gray-400' size={18} />
                    <input
                      type='text'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Email Address</label>
                  <div className='relative'>
                    <Mail className='absolute left-4 top-3.5 text-gray-400' size={18} />
                    <input
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>New Password</label>
                  <div className='relative'>
                    <Lock className='absolute left-4 top-3.5 text-gray-400' size={18} />
                    <input
                      type='password'
                      placeholder='Enter password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Confirm Password</label>
                  <div className='relative'>
                    <Lock className='absolute left-4 top-3.5 text-gray-400' size={18} />
                    <input
                      type='password'
                      placeholder='Confirm password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  className='w-full py-4 bg-primary text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center space-x-2 mt-4'
                >
                  <Save size={20} />
                  <span>Update Profile</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Order History */}
        <div className='lg:col-span-8'>
          <h2 className='text-3xl font-black text-gray-900 mb-8'>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : orders.length === 0 ? (
            <div className='bg-white rounded-3xl p-12 text-center shadow-premium border border-gray-100'>
              <p className='text-gray-500'>You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className='overflow-x-auto bg-white rounded-3xl shadow-premium border border-gray-100'>
              <table className='w-full text-left'>
                <thead>
                  <tr className='bg-gray-50 border-b border-gray-100'>
                    <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Order ID</th>
                    <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Date</th>
                    <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Total</th>
                    <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Paid</th>
                    <th className='px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest'>Delivered</th>
                    <th className='px-6 py-4'></th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-50'>
                  {orders.map((order) => (
                    <tr key={order._id} className='hover:bg-gray-50/50 transition-colors'>
                      <td className='px-6 py-4 text-sm font-bold text-gray-900'>#{order._id.substring(0, 8)}</td>
                      <td className='px-6 py-4 text-sm text-gray-500'>{order.createdAt.substring(0, 10)}</td>
                      <td className='px-6 py-4 text-sm font-black text-gray-900'>${order.totalPrice}</td>
                      <td className='px-6 py-4 text-sm'>
                        {order.isPaid ? (
                          <span className='inline-flex items-center text-green-600 font-bold'>
                            <CheckCircle size={14} className='mr-1' /> {order.paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className='inline-flex items-center text-red-500 font-bold'>
                            <XCircle size={14} className='mr-1' /> No
                          </span>
                        )}
                      </td>
                      <td className='px-6 py-4 text-sm'>
                        {order.isDelivered ? (
                          <span className='inline-flex items-center text-green-600 font-bold'>
                            <CheckCircle size={14} className='mr-1' /> {order.deliveredAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className='inline-flex items-center text-red-500 font-bold'>
                            <XCircle size={14} className='mr-1' /> No
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
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen
