import React from 'react'
import DatePicker from 'react-datepicker'
import { Label } from '../ui/inputFields/Label'
import Input from '../ui/form/Input'
import { Switch } from '../ui/inputFields/Switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../Select'
import { Card } from '../ui/Card'
import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import 'react-datepicker/dist/react-datepicker.css'

interface FormFieldWrapperProps {
    field: any
    updateField: (id: number, key: string, value: any) => void
}

const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
    field,
    updateField,
}) => {
    const handleDateChange = (key: string, date: Date | null) => {
        updateField(field.id, key, date?.toISOString() || null)
    }

    return (
        <div className="space-y-6">
            {/* Basic Field Settings */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input
                        value={field.displayName}
                        onChange={(e) =>
                            updateField(field.id, 'displayName', e.target.value)
                        }
                        placeholder="Enter field label..."
                    />
                </div>
                <div className="space-y-2">
                    <Label>Field Name</Label>
                    <Input
                        value={field.name}
                        onChange={(e) =>
                            updateField(field.id, 'name', e.target.value)
                        }
                        placeholder="Enter field name..."
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label>Description</Label>
                <Input
                    value={field.description}
                    onChange={(e) =>
                        updateField(field.id, 'description', e.target.value)
                    }
                    placeholder="Enter field description..."
                />
            </div>

            {/* Date Specific Settings */}
            {field.type === 'date' && (
                <Card className="p-4 space-y-4 bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">Date Settings</h4>
                        <Tooltip>
                            <TooltipTrigger>
                                <Info className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                                Configure date format and valid date range
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    {/* Date Format */}
                    <div className="space-y-2">
                        <Label>Date Format</Label>
                        <Select
                            value={field.dateFormat}
                            onValueChange={(value) =>
                                updateField(field.id, 'dateFormat', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="YYYY-MM-DD">
                                    YYYY-MM-DD
                                </SelectItem>
                                <SelectItem value="DD-MM-YYYY">
                                    DD-MM-YYYY
                                </SelectItem>
                                <SelectItem value="MM-DD-YYYY">
                                    MM-DD-YYYY
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Minimum Date</Label>
                            <DatePicker
                                selected={
                                    field.minDate
                                        ? new Date(field.minDate)
                                        : null
                                }
                                onChange={(date) =>
                                    handleDateChange('minDate', date)
                                }
                                dateFormat={field.dateFormat.toLowerCase()}
                                placeholderText="Select min date..."
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                maxDate={
                                    field.maxDate
                                        ? new Date(field.maxDate)
                                        : undefined
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Maximum Date</Label>
                            <DatePicker
                                selected={
                                    field.maxDate
                                        ? new Date(field.maxDate)
                                        : null
                                }
                                onChange={(date) =>
                                    handleDateChange('maxDate', date)
                                }
                                dateFormat={field.dateFormat.toLowerCase()}
                                placeholderText="Select max date..."
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                                minDate={
                                    field.minDate
                                        ? new Date(field.minDate)
                                        : undefined
                                }
                            />
                        </div>
                    </div>
                </Card>
            )}

            {/* Validation Settings */}
            <Card className="p-4 space-y-4 bg-gray-50/50">
                <h4 className="font-medium text-sm">Validation Settings</h4>

                {/* Required Field */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={field.isMandatory}
                            onChange={(e) => {
                                const checked = e.target.checked
                                updateField(field.id, 'isMandatory', checked)
                                if (checked && !field.errorMessage) {
                                    updateField(
                                        field.id,
                                        'errorMessage',
                                        field.type === 'date'
                                            ? `Please select a valid date${
                                                  field.minDate || field.maxDate
                                                      ? ' within the allowed range'
                                                      : ''
                                              }`
                                            : 'This field is required'
                                    )
                                }
                            }}
                        />
                        <Label>Required Field</Label>
                    </div>
                </div>

                {/* Error Message */}
                {field.isMandatory && (
                    <div className="space-y-2">
                        <Label>Error Message</Label>
                        <Input
                            value={field.errorMessage}
                            onChange={(e) =>
                                updateField(
                                    field.id,
                                    'errorMessage',
                                    e.target.value
                                )
                            }
                            placeholder="Enter error message..."
                        />
                        <p className="text-xs text-gray-500">
                            This message will be shown when the field validation
                            fails
                        </p>
                    </div>
                )}
            </Card>

            {/* Visibility Settings */}
            <Card className="p-4 space-y-4 bg-gray-50/50">
                <h4 className="font-medium text-sm">Visibility Settings</h4>
                <div className="space-y-2">
                    <Label>Field Visibility</Label>
                    <Select
                        value={field.visibility}
                        onValueChange={(value) =>
                            updateField(field.id, 'visibility', value)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Show">Show</SelectItem>
                            <SelectItem value="Hide">Hide</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Card>
        </div>
    )
}

export default FormFieldWrapper
