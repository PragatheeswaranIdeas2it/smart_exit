import React from 'react'
import { cn } from '../../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    'block w-full rounded-lg border bg-white px-3 py-2',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    'disabled:bg-gray-50 disabled:text-gray-500',
                    'placeholder:text-gray-400',
                    'transition-colors duration-200',
                    error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300',
                    className
                )}
                {...props}
            />
        )
    }
)

Input.displayName = 'Input'

export default Input
