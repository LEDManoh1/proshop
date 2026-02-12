import React from 'react'
import { Star, StarHalf } from 'lucide-react'

const Rating = ({ value, text, color }) => {
  const stars = []

  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(<Star key={i} size={16} fill={color} color={color} />)
    } else if (value >= i - 0.5) {
      stars.push(<StarHalf key={i} size={16} fill={color} color={color} />)
    } else {
      stars.push(<Star key={i} size={16} color='#d1d5db' />)
    }
  }

  return (
    <div className='flex items-center space-x-1'>
      <div className='flex items-center mr-2'>
        {stars}
      </div>
      {text && <span className='text-xs text-gray-500 font-medium'>{text}</span>}
    </div>
  )
}

Rating.defaultProps = {
  color: '#f59e0b', // Amber 500
}

export default Rating
