import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address || '')
  const [city, setCity] = useState(shippingAddress.city || '')
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
  const [country, setCountry] = useState(shippingAddress.country || '')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  const inputClasses = 'w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300'
  const labelClasses = 'block text-sm font-bold text-gray-700 mb-2 ml-1'

  return (
    <div className='py-8'>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1 className='text-3xl font-black text-gray-900 mb-8 text-center'>Shipping Details</h1>
        <form onSubmit={submitHandler} className='space-y-6'>
          <div>
            <label className={labelClasses}>Address</label>
            <input
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              className={inputClasses}
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className={labelClasses}>City</label>
              <input
                type='text'
                placeholder='Enter city'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Postal Code</label>
              <input
                type='text'
                placeholder='Enter postal code'
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Country</label>
            <input
              type='text'
              placeholder='Enter country'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              className={inputClasses}
            />
          </div>

          <button
            type='submit'
            className='w-full py-4 bg-primary text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300 transform active:scale-[0.98] mt-4'
          >
            Continue to Payment
          </button>
        </form>
      </FormContainer>
    </div>
  )
}

export default ShippingScreen
