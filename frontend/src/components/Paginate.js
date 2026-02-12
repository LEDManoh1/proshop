import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) return null

  const getPageUrl = (p) => {
    if (!isAdmin) {
      return keyword ? `/search/${keyword}/page/${p}` : `/page/${p}`
    } else {
      return `/admin/productlist/${p}`
    }
  }

  return (
    <nav className='flex items-center justify-center space-x-2'>
      {page > 1 && (
        <Link
          to={getPageUrl(page - 1)}
          className='p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors'
        >
          <ChevronLeft size={20} />
        </Link>
      )}

      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          to={getPageUrl(x + 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all duration-300 ${x + 1 === page
              ? 'bg-primary text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
            }`}
        >
          {x + 1}
        </Link>
      ))}

      {page < pages && (
        <Link
          to={getPageUrl(page + 1)}
          className='p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors'
        >
          <ChevronRight size={20} />
        </Link>
      )}
    </nav>
  )
}

export default Paginate
