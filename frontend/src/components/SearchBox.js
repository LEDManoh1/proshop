import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Search } from 'lucide-react'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <form onSubmit={submitHandler} className='relative flex-grow max-w-lg mx-4'>
      <input
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search products...'
        className='w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:bg-white transition-all duration-300 text-sm'
      />
      <Search className='absolute left-3 top-2.5 text-gray-400 h-4 w-4' />
    </form>
  )
}

export default SearchBox
