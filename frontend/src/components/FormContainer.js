import React from 'react'

const FormContainer = ({ children }) => {
  return (
    <div className='max-w-xl mx-auto px-4'>
      <div className='bg-white rounded-3xl p-8 sm:p-12 shadow-premium border border-gray-100'>
        {children}
      </div>
    </div>
  )
}

export default FormContainer
