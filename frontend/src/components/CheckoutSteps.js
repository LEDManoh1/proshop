import React from 'react'
import { Link } from 'react-router-dom'
import { Check, User, Truck, CreditCard, ClipboardCheck } from 'lucide-react'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { name: 'Sign In', icon: User, completed: step1, link: '/login' },
    { name: 'Shipping', icon: Truck, completed: step2, link: '/shipping' },
    { name: 'Payment', icon: CreditCard, completed: step3, link: '/payment' },
    { name: 'Place Order', icon: ClipboardCheck, completed: step4, link: '/placeorder' },
  ]

  return (
    <nav aria-label='Progress' className='mb-12'>
      <ol role='list' className='flex items-center justify-center space-x-2 sm:space-x-8'>
        {steps.map((step, stepIdx) => (
          <li key={step.name} className='flex items-center'>
            <div className='flex flex-col items-center group'>
              {step.completed ? (
                <Link
                  to={step.link}
                  className='relative flex h-10 w-10 items-center justify-center rounded-full bg-primary hover:bg-primary-dark transition-colors shadow-md'
                >
                  <Check className='h-5 w-5 text-white' aria-hidden='true' />
                </Link>
              ) : (
                <div className='relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 bg-white'>
                  <step.icon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                </div>
              )}
              <span className={`mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider ${step.completed ? 'text-primary' : 'text-gray-400'}`}>
                {step.name}
              </span>
            </div>
            {stepIdx !== steps.length - 1 && (
              <div className='ml-2 sm:ml-8 w-8 sm:w-16 h-px bg-gray-200 hidden xs:block' />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default CheckoutSteps
