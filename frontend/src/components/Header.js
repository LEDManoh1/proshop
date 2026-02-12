import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { ShoppingCart, User, LogOut, ChevronDown, Menu, X } from 'lucide-react'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false)

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
    setIsUserDropdownOpen(false)
  }

  return (
    <header className='sticky top-0 z-50 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0 flex items-center'>
            <Link to='/' className='text-2xl font-black tracking-tighter text-primary'>
              PRO<span className='text-secondary-dark'>SHOP</span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className='hidden md:flex flex-grow justify-center'>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </div>

          {/* Right Menu */}
          <div className='hidden md:flex items-center space-x-4'>
            <Link to='/cart' className='flex items-center text-gray-600 hover:text-primary transition-colors duration-300'>
              <ShoppingCart size={20} className='mr-1' />
              <span className='text-sm font-medium'>Cart</span>
            </Link>

            {userInfo ? (
              <div className='relative'>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className='flex items-center text-gray-600 hover:text-primary transition-colors duration-300 focus:outline-none'
                >
                  <User size={20} className='mr-1' />
                  <span className='text-sm font-medium'>{userInfo.name}</span>
                  <ChevronDown size={16} className='ml-1' />
                </button>
                {isUserDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-premium border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200'>
                    <Link
                      to='/profile'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to='/login' className='flex items-center text-gray-600 hover:text-primary transition-colors duration-300'>
                <User size={20} className='mr-1' />
                <span className='text-sm font-medium'>Sign In</span>
              </Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className='relative'>
                <button
                  onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                  className='flex items-center text-gray-600 hover:text-primary transition-colors duration-300 focus:outline-none'
                >
                  <span className='text-sm font-medium'>Admin</span>
                  <ChevronDown size={16} className='ml-1' />
                </button>
                {isAdminDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-premium border border-gray-100 py-2'>
                    <Link
                      to='/admin/userlist'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                      onClick={() => setIsAdminDropdownOpen(false)}
                    >
                      Users
                    </Link>
                    <Link
                      to='/admin/productlist'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                      onClick={() => setIsAdminDropdownOpen(false)}
                    >
                      Products
                    </Link>
                    <Link
                      to='/admin/orderlist'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                      onClick={() => setIsAdminDropdownOpen(false)}
                    >
                      Orders
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='text-gray-400 hover:text-gray-500 focus:outline-none'
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 pb-4'>
          <div className='px-4 pt-2 pb-3 space-y-1'>
            <div className='mb-4'>
              <Route render={({ history }) => <SearchBox history={history} />} />
            </div>
            <Link
              to='/cart'
              className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
            </Link>
            {!userInfo && (
              <Link
                to='/login'
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
            {userInfo && (
              <>
                <Link
                  to='/profile'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50'
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
