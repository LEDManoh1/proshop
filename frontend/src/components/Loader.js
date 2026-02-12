import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center py-20'>
      <div className='relative w-16 h-16'>
        <div className='absolute inset-0 border-4 border-gray-100 rounded-full'></div>
        <div className='absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
      </div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default Loader
