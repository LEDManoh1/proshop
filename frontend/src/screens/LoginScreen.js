import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Mail, Lock, LogIn } from 'lucide-react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const inputClasses = 'w-full bg-gray-50 border-none rounded-xl py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300'
  const labelClasses = 'block text-sm font-bold text-gray-700 mb-2 ml-1'

  return (
    <div className='py-12'>
      <FormContainer>
        <div className='text-center mb-10'>
          <h1 className='text-3xl font-black text-gray-900 mb-2'>Welcome Back</h1>
          <p className='text-gray-500'>Please sign in to your account</p>
        </div>

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <form onSubmit={submitHandler} className='space-y-6'>
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

          <div>
            <label className={labelClasses}>Password</label>
            <div className='relative'>
              <Lock className='absolute left-4 top-3.5 text-gray-400' size={18} />
              <input
                type='password'
                placeholder='Enter password'
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>

          <button
            type='submit'
            className='w-full py-4 bg-primary text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center space-x-2'
          >
            <span>Sign In</span>
            <LogIn size={20} />
          </button>
        </form>

        <div className='mt-8 pt-6 border-t border-gray-50 text-center'>
          <p className='text-gray-500 text-sm'>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className='text-primary font-bold hover:underline'
            >
              Create an account
            </Link>
          </p>
        </div>
      </FormContainer>
    </div>
  )
}

export default LoginScreen
