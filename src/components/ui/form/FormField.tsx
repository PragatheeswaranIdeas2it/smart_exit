import React from 'react'
import { cn } from '../../../lib/utils'

interface FormFieldWrapperProps {
    label: string
    required?: boolean
    error?: string
    hint?: string
    labelClassName?: string
    className?: string
    children: React.ReactNode
    htmlFor: string
}

const FormFieldWrapper = ({
    label,
    required = false,
    error,
    hint,
    labelClassName,
    className,
    children,
    htmlFor,
}: FormFieldWrapperProps) => {
    return (
        <div className={cn('space-y-1.5', className)}>
            <div className="flex justify-between items-center">
                <label
                    htmlFor={htmlFor}
                    className={cn(
                        'block text-sm font-medium text-gray-700',
                        error && 'text-red-500',
                        labelClassName
                    )}
                >
                    {label}
                    {required && (
                        <span className="text-red-500 ml-1" aria-hidden="true">
                            *
                        </span>
                    )}
                </label>
                {hint && <span className="text-sm text-gray-500">{hint}</span>}
            </div>

            {children}

            {error && (
                <p className="text-sm text-red-500 mt-1" role="alert">
                    {error}
                </p>
            )}
        </div>
    )
}

export default FormFieldWrapper
