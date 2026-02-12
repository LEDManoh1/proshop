import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreditCard } from 'lucide-react'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress.address) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <div className='py-8'>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1 className='text-3xl font-black text-gray-900 mb-8 text-center'>Payment Method</h1>
        <form onSubmit={submitHandler} className='space-y-6'>
          <div className='space-y-4'>
            <label className='block text-sm font-bold text-gray-700 mb-4 ml-1'>Select a payment method</label>

            <div
              onClick={() => setPaymentMethod('PayPal')}
              className={`relative flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${paymentMethod === 'PayPal' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
            >
              <div className={`p-3 rounded-xl mr-4 ${paymentMethod === 'PayPal' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                <CreditCard size={24} />
              </div>
              <div className='flex-grow'>
                <p className='font-bold text-gray-900'>PayPal or Credit Card</p>
                <p className='text-xs text-gray-500 font-medium'>Safe and secure payment gateway</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'PayPal' ? 'border-primary' : 'border-gray-200'}`}>
                {paymentMethod === 'PayPal' && <div className='w-3 h-3 rounded-full bg-primary' />}
              </div>
            </div>
          </div>

          <button
            type='submit'
            className='w-full py-4 bg-primary text-white rounded-xl font-black shadow-lg hover:shadow-xl hover:bg-primary-dark transition-all duration-300 transform active:scale-[0.98] mt-4'
          >
            Continue to Order Summary
          </button>
        </form>
      </FormContainer>
    </div>
  )
}

export default PaymentScreen
