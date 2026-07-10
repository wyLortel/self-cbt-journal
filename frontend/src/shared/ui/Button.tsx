import { ReactNode } from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'text'
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  className?: string
}

export default function Button({
  variant = 'primary',
  disabled = false,
  children,
  onClick,
  type = 'button',
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const baseClass = 'h-12 px-6 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-4'

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 focus:ring-indigo-100',
    secondary: 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 focus:ring-indigo-100',
    danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-100 focus:ring-red-100',
    text: 'px-2 py-1 h-auto text-indigo-600 text-sm font-medium hover:bg-indigo-50 hover:text-indigo-700 focus:ring-indigo-100',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  )
}
