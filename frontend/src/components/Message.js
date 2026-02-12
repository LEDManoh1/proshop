import React from 'react'
import { Info, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'

const Message = ({ variant, children }) => {
  const getStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          bg: 'bg-red-50',
          border: 'border-red-100',
          text: 'text-red-700',
          icon: <AlertCircle size={20} className='text-red-400' />,
        }
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-100',
          text: 'text-green-700',
          icon: <CheckCircle size={20} className='text-green-400' />,
        }
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-100',
          text: 'text-amber-700',
          icon: <AlertTriangle size={20} className='text-amber-400' />,
        }
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-100',
          text: 'text-blue-700',
          icon: <Info size={20} className='text-blue-400' />,
        }
    }
  }

  const styles = getStyles()

  return (
    <div className={`p-4 rounded-xl border ${styles.bg} ${styles.border} ${styles.text} flex items-center space-x-3 mb-4 animate-in fade-in slide-in-from-top-1`}>
      {styles.icon}
      <div className='text-sm font-medium'>{children}</div>
    </div>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
