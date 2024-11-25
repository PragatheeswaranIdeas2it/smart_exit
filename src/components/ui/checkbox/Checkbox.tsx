import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { cn } from '../../../lib/utils'

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
        indeterminate?: boolean
        label?: string
        description?: string
        error?: string
    }
>(
    (
        {
            className,
            indeterminate,
            label,
            description,
            error,
            disabled,
            required,
            ...props
        },
        ref
    ) => {
        const id = React.useId()

        return (
            <div className="flex items-start gap-3">
                <CheckboxPrimitive.Root
                    ref={ref}
                    id={id}
                    className={cn(
                        'peer h-5 w-5 shrink-0 rounded-md border border-gray-200',
                        'ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'data-[state=checked]:bg-blue-600 data-[state=checked]:text-white data-[state=checked]:border-blue-600',
                        'data-[state=indeterminate]:bg-blue-600 data-[state=indeterminate]:text-white data-[state=indeterminate]:border-blue-600',
                        error && 'border-red-300',
                        className
                    )}
                    disabled={disabled}
                    required={required}
                    {...props}
                >
                    <CheckboxPrimitive.Indicator
                        className={cn(
                            'flex items-center justify-center text-current',
                            'data-[state=indeterminate]:animate-in data-[state=checked]:animate-in',
                            'data-[state=indeterminate]:fade-in-0 data-[state=checked]:fade-in-0',
                            'data-[state=indeterminate]:zoom-in-95 data-[state=checked]:zoom-in-95'
                        )}
                    >
                        {indeterminate ? (
                            <Minus className="h-4 w-4" />
                        ) : (
                            <Check className="h-4 w-4" />
                        )}
                    </CheckboxPrimitive.Indicator>
                </CheckboxPrimitive.Root>

                {(label || description) && (
                    <div>
                        {label && (
                            <label
                                htmlFor={id}
                                className={cn(
                                    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                                    error && 'text-red-500'
                                )}
                            >
                                {label}
                                {required && (
                                    <span
                                        className="text-red-500 ml-1"
                                        aria-hidden="true"
                                    >
                                        *
                                    </span>
                                )}
                            </label>
                        )}
                        {description && (
                            <p
                                className={cn(
                                    'text-sm text-gray-500 mt-1.5',
                                    error && 'text-red-400'
                                )}
                            >
                                {description}
                            </p>
                        )}
                        {error && (
                            <p
                                className="text-sm text-red-500 mt-1.5"
                                role="alert"
                            >
                                {error}
                            </p>
                        )}
                    </div>
                )}
            </div>
        )
    }
)

Checkbox.displayName = 'Checkbox'

// CheckboxGroup Component
interface CheckboxGroupProps {
    label?: string
    description?: string
    error?: string
    children: React.ReactNode
    className?: string
    orientation?: 'horizontal' | 'vertical'
}

const CheckboxGroup = ({
    label,
    description,
    error,
    children,
    className,
    orientation = 'vertical',
}: CheckboxGroupProps) => {
    return (
        <div className={className}>
            {label && (
                <div className="mb-3">
                    <label
                        className={cn(
                            'text-sm font-medium text-gray-700',
                            error && 'text-red-500'
                        )}
                    >
                        {label}
                    </label>
                    {description && (
                        <p className="mt-1 text-sm text-gray-500">
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div
                className={cn(
                    'space-y-3',
                    orientation === 'horizontal' &&
                        'space-y-0 space-x-6 flex items-center'
                )}
                role="group"
                aria-label={label}
            >
                {children}
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-500" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}

export { Checkbox, CheckboxGroup }
