import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeft, User, Mail, ShieldCheck, Save, Shield } from 'lucide-react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, history, userId, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  const inputClasses = 'w-full bg-gray-50 border-none rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300'
  const labelClasses = 'block text-sm font-bold text-gray-700 mb-2 ml-1'

  return (
    <div className='py-8'>
      <Link
        to='/admin/userlist'
        className='inline-flex items-center space-x-2 text-primary font-bold hover:translate-x-[-4px] transition-transform duration-300 mb-8'
      >
        <ArrowLeft size={18} />
        <span>Back to User List</span>
      </Link>

      <FormContainer>
        <div className='flex items-center space-x-3 mb-8'>
          <div className='p-3 bg-primary/10 text-primary rounded-2xl'>
            <User size={24} />
          </div>
          <h1 className='text-3xl font-black text-gray-900'>Edit User</h1>
        </div>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

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
                  required
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
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                />
              </div>
            </div>

            <div className='pt-2'>
              <label className='relative flex items-center cursor-pointer group'>
                <input
                  type='checkbox'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className='sr-only peer'
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                <div className='ml-3 flex items-center space-x-2'>
                  <Shield size={16} className={isAdmin ? 'text-primary' : 'text-gray-400'} />
                  <span className='text-sm font-bold text-gray-700'>Administrator Access</span>
                </div>
              </label>
              <p className='mt-2 text-xs text-gray-400 ml-[3.25rem]'>Granting admin access allows the user to manage products, users, and orders.</p>
            </div>

            <button
              type='submit'
              className='w-full py-4 bg-primary text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center space-x-2 mt-4'
            >
              <Save size={20} />
              <span>Update User</span>
            </button>
          </form>
        )}
      </FormContainer>
    </div>
  )
}

export default UserEditScreen
