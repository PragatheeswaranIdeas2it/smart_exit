import React from 'react'

// Switch Component
export const Switch = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
    <input
        type="checkbox"
        role="switch"
        ref={ref}
        className={`peer h-[24px] w-[44px] cursor-pointer appearance-none rounded-full bg-input 
      after:absolute after:top-[2px] after:left-[2px] after:h-[20px] after:w-[20px] 
      after:rounded-full after:bg-background after:transition-all after:content-[''] 
      checked:bg-primary checked:after:translate-x-[20px] focus-visible:outline-none 
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
))
Switch.displayName = 'Switch'
