import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '../ui/dialog'
import { Button } from '../ui/Button'
import Input from '../ui/form/Input'
import { Label } from '../ui/inputFields/Label'
import { Checkbox } from '../ui/checkbox/Checkbox'
import { RadioGroup, RadioGroupItem } from '../ui/form/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../Select'
import { Textarea } from '../ui/inputFields/TextareaInput'
import { cn } from '../../lib/utils'
import { X } from 'lucide-react'
import { DatePicker } from 'react-date-picker'
import FormField from '../ui/form/FormField'
import { Value } from 'react-date-picker/dist/cjs/shared/types'

interface PreviewFormProps {
    isOpen: boolean
    onClose: () => void
    fields: any[]
}

export function PreviewForm({ isOpen, onClose, fields }: PreviewFormProps) {
    const validateDateField = (field: any, value: string) => {
        if (field.isMandatory && !value) {
            return field.customErrorMessage || 'This field is required'
        }

        if (value) {
            const selectedDate = new Date(value)

            if (field.minDate && selectedDate < new Date(field.minDate)) {
                return `Date must be after ${new Date(field.minDate).toLocaleDateString()}`
            }

            if (field.maxDate && selectedDate > new Date(field.maxDate)) {
                return `Date must be before ${new Date(field.maxDate).toLocaleDateString()}`
            }
        }

        return ''
    }

    function handleFieldChange(id: any, date: Value): void {
        throw new Error('Function not implemented.')
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl h-[90vh] p-0 overflow-hidden bg-white/95">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white/50 backdrop-blur-sm supports-[backdrop-filter]:bg-white/50 border-b">
                    <div className="absolute right-6 top-6">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8 rounded-full hover:bg-gray-100/80"
                        >
                            <X className="h-4 w-4 text-gray-500" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                    <DialogHeader className="p-6 pb-4">
                        <div className="flex items-start gap-2">
                            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
                            <div>
                                <DialogTitle className="text-2xl font-bold">
                                    Form Preview
                                </DialogTitle>
                                <p className="text-gray-500 mt-1.5">
                                    Preview how your form will appear to users
                                </p>
                            </div>
                        </div>

                        {/* Form Stats */}
                        <div className="flex items-center gap-3 mt-4">
                            <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm font-medium flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                                {fields.length} Field
                                {fields.length !== 1 && 's'}
                            </div>
                            <div className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-md text-sm font-medium flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                {fields.filter((f) => f.isMandatory).length}{' '}
                                Required
                            </div>
                        </div>
                    </DialogHeader>
                </div>

                {/* Scrollable Form Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-6 space-y-6">
                        {fields.map((field) => (
                            <div
                                key={field.id}
                                className={cn(
                                    'space-y-3 bg-white rounded-lg p-6 border shadow-sm transition-all',
                                    'hover:shadow-md hover:border-gray-300',
                                    field.visibility === 'Hide' && 'opacity-50'
                                )}
                            >
                                <Label
                                    htmlFor={field.name}
                                    className="text-base font-medium flex items-center gap-2"
                                >
                                    {field.type === 'checkbox'
                                        ? field.question
                                        : field.displayName}
                                    {field.isMandatory && (
                                        <span className="text-red-500 text-sm">
                                            *
                                        </span>
                                    )}
                                </Label>

                                {field.description && (
                                    <p className="text-sm text-gray-500">
                                        {field.description}
                                    </p>
                                )}

                                <div className="pt-1">
                                    {/* Text Input */}
                                    {field.type === 'text' && (
                                        <Input
                                            id={field.name}
                                            placeholder={`Enter ${field.displayName.toLowerCase()}`}
                                            defaultValue={field.defaultValue}
                                            disabled={!field.isEnabled}
                                            className="max-w-xl"
                                        />
                                    )}

                                    {/* Textarea */}
                                    {field.type === 'textarea' && (
                                        <Textarea
                                            id={field.name}
                                            placeholder={`Enter ${field.displayName.toLowerCase()}`}
                                            defaultValue={field.defaultValue}
                                            disabled={!field.isEnabled}
                                            className="max-w-xl h-32 resize-y"
                                        />
                                    )}

                                    {/* Checkbox Group */}
                                    {field.type === 'checkbox' && (
                                        <div className="space-y-3 pt-1">
                                            {field.options.map(
                                                (
                                                    option: string,
                                                    idx: number
                                                ) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Checkbox
                                                            id={`${field.name}-${idx}`}
                                                            disabled={
                                                                !field.isEnabled
                                                            }
                                                        />
                                                        <Label
                                                            htmlFor={`${field.name}-${idx}`}
                                                            className="text-sm font-normal"
                                                        >
                                                            {option}
                                                        </Label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {/* Radio Group */}
                                    {field.type === 'radio' && (
                                        <RadioGroup
                                            defaultValue={field.defaultValue}
                                            disabled={!field.isEnabled}
                                            className="space-y-3 pt-1"
                                        >
                                            {field.options.map(
                                                (
                                                    option: string,
                                                    idx: number
                                                ) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <RadioGroupItem
                                                            value={option}
                                                            id={`${field.name}-${idx}`}
                                                        />
                                                        <Label
                                                            htmlFor={`${field.name}-${idx}`}
                                                            className="text-sm font-normal"
                                                        >
                                                            {option}
                                                        </Label>
                                                    </div>
                                                )
                                            )}
                                        </RadioGroup>
                                    )}

                                    {/* Select Dropdown */}
                                    {field.type === 'select' && (
                                        <Select
                                            defaultValue={field.defaultValue}
                                            disabled={!field.isEnabled}
                                        >
                                            <SelectTrigger className="max-w-xl">
                                                <SelectValue
                                                    placeholder={`Select ${field.displayName.toLowerCase()}`}
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options.map(
                                                    (
                                                        option: string,
                                                        idx: number
                                                    ) => (
                                                        <SelectItem
                                                            key={idx}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {field.type === 'date' && (
                                        <FormField
                                            label={field.displayName}
                                            required={field.isMandatory}
                                            error={validateDateField(
                                                field,
                                                field.value
                                            )}
                                            htmlFor={`${field.name}-date`}
                                        >
                                            <DatePicker
                                                value={
                                                    field.value
                                                        ? new Date(field.value)
                                                        : new Date()
                                                }
                                                onChange={(date) =>
                                                    handleFieldChange(
                                                        field.id,
                                                        date
                                                    )
                                                }
                                                format={field.dateFormat}
                                                minDate={
                                                    field.minDate
                                                        ? new Date(
                                                              field.minDate
                                                          )
                                                        : undefined
                                                }
                                                maxDate={
                                                    field.maxDate
                                                        ? new Date(
                                                              field.maxDate
                                                          )
                                                        : undefined
                                                }
                                                // placeholder={`Select ${field.displayName.toLowerCase()}...`}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                            />
                                        </FormField>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sticky Footer */}
                <div className="sticky bottom-0 mt-auto border-t bg-white/50 backdrop-blur-sm supports-[backdrop-filter]:bg-white/50">
                    <div className="px-6 py-4 flex items-center justify-between gap-4">
                        <p className="text-sm text-gray-500">
                            Test the form functionality before implementing
                        </p>
                        <div className="flex gap-2 shrink-0">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="gap-2"
                            >
                                Close Preview
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
