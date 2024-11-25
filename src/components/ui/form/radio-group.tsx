'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { cn } from '../../../lib/utils'

const RadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn('grid gap-2', className)}
            {...props}
            ref={ref}
        />
    )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                'aspect-square h-4 w-4 rounded-full border border-gray-200 text-blue-600',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'hover:border-blue-500 hover:bg-blue-50/50 transition-colors',
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <Circle className="h-2.5 w-2.5 fill-current text-current animate-in zoom-in-75" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// FormField wrapper for RadioGroup
const FormRadioGroup = React.forwardRef<
    React.ElementRef<typeof RadioGroup>,
    React.ComponentPropsWithoutRef<typeof RadioGroup> & {
        label?: string
        error?: string
        description?: string
    }
>(({ className, label, error, description, ...props }, ref) => {
    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {label}
                    </label>
                </div>
            )}
            <RadioGroup ref={ref} className="grid gap-3" {...props} />
            {description && (
                <p className="text-[0.8rem] text-gray-500">{description}</p>
            )}
            {error && (
                <p className="text-[0.8rem] text-red-500 font-medium">
                    {error}
                </p>
            )}
        </div>
    )
})
FormRadioGroup.displayName = 'FormRadioGroup'

export { RadioGroup, RadioGroupItem, FormRadioGroup }
