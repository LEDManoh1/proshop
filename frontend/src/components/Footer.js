import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-white border-t border-gray-100 py-12 mt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='col-span-1 md:col-span-2'>
            <span className='text-2xl font-black tracking-tighter text-primary'>
              PRO<span className='text-secondary-dark'>SHOP</span>
            </span>
            <p className='mt-4 text-gray-500 text-sm max-w-xs'>
              Experience the best in modern eCommerce. Premium products, seamless shopping, and professional service.
            </p>
          </div>
          <div>
            <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wider'>Customer Service</h3>
            <ul className='mt-4 space-y-2'>
              <li><a href='#' className='text-sm text-gray-500 hover:text-primary transition-colors'>Shipping Policy</a></li>
              <li><a href='#' className='text-sm text-gray-500 hover:text-primary transition-colors'>Return & Refund</a></li>
              <li><a href='#' className='text-sm text-gray-500 hover:text-primary transition-colors'>Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className='text-sm font-bold text-gray-900 uppercase tracking-wider'>Contact</h3>
            <ul className='mt-4 space-y-2'>
              <li className='text-sm text-gray-500'>support@proshop.com</li>
              <li className='text-sm text-gray-500'>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className='mt-12 border-t border-gray-100 pt-8 flex justify-between items-center'>
          <p className='text-sm text-gray-400'>
            &copy; {new Date().getFullYear()} ProShop. All rights reserved.
          </p>
          <div className='flex space-x-6'>
            {/* Social Icons Placeholder */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
