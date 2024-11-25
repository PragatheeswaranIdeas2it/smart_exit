import React from 'react'
import { Label } from '../inputFields/Label'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { cn } from '../../../lib/utils'

interface RadioOption {
    label: string
    value: string
    description?: string
    disabled?: boolean
}

interface RadioGroupFieldProps {
    label?: string
    name: string
    options: RadioOption[]
    defaultValue?: string
    value?: string
    onChange?: (value: string) => void
    error?: string
    description?: string
    className?: string
    disabled?: boolean
    required?: boolean
}

export function RadioGroupField({
    label,
    name,
    options,
    defaultValue,
    value,
    onChange,
    error,
    description,
    className,
    disabled,
    required,
}: RadioGroupFieldProps) {
    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <Label
                    htmlFor={name}
                    className="text-base font-medium flex items-center gap-2"
                >
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </Label>
            )}

            {description && (
                <p className="text-sm text-gray-500">{description}</p>
            )}

            <RadioGroup
                name={name}
                defaultValue={defaultValue}
                value={value}
                onValueChange={onChange}
                disabled={disabled}
                className="space-y-3"
            >
                {options.map((option) => (
                    <div
                        key={option.value}
                        className={cn(
                            'flex items-center gap-3 rounded-lg border border-transparent p-3 transition-colors',
                            'hover:bg-gray-50/50',
                            'data-[state=checked]:bg-blue-50/50 data-[state=checked]:border-blue-100'
                        )}
                    >
                        <RadioGroupItem
                            value={option.value}
                            id={`${name}-${option.value}`}
                            disabled={option.disabled}
                        />
                        <Label
                            htmlFor={`${name}-${option.value}`}
                            className="flex-1 cursor-pointer"
                        >
                            <div className="font-medium text-gray-900">
                                {option.label}
                            </div>
                            {option.description && (
                                <div className="text-sm text-gray-500 mt-0.5">
                                    {option.description}
                                </div>
                            )}
                        </Label>
                    </div>
                ))}
            </RadioGroup>

            {error && (
                <p className="text-sm text-red-500 font-medium mt-1.5">
                    {error}
                </p>
            )}
        </div>
    )
}
