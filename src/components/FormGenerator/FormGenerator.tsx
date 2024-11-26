import React, { useState } from 'react'
import {
    Trash2,
    FileDown,
    Eye,
    PlusIcon,
    ChevronDown,
    GripVertical,
    Save,
    Loader2,
    Plus,
} from 'lucide-react'
import { Button } from '../ui/Button'
import FormFieldWrapper from '../ui/form/FormField'
import Input from '../ui/form/Input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../Select'
import { Switch } from '../ui/inputFields/Switch'
import { Checkbox } from '../ui/checkbox/Checkbox'
import TagInput from '../ui/inputFields/TagInput'
import { Card, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from '../ui/tooltip'
import { EmptyState } from './EmptyState'
import { inputTypes } from './types'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion'
import { PreviewForm } from './PreviewForm'
import { Dialog } from '../ui/dialog'
import { Toaster } from 'sonner'
import { toast } from 'sonner'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { appConstants } from '../../constants/appConstants'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const SuccessAnimation = ({
    isOpen,
    onClose,
    fields,
}: {
    isOpen: boolean
    onClose: () => void
    fields: any[]
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4 relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-24 h-24 rounded-full bg-green-100 mx-auto flex items-center justify-center"
                        >
                            <motion.svg
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="w-12 h-12 text-green-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </motion.svg>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl font-bold text-center mt-6 text-gray-800"
                        >
                            Form Saved Successfully!
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-600 text-center mt-2"
                        >
                            Your form has been created with
                            <span className="text-blue-600 px-2 font-bold">
                                {fields?.length || 0}
                            </span>{' '}
                            fields
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            onClick={onClose}
                            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Continue
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function FormGenerator() {
    const [fields, setFields] = useState<any[]>([])
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    console.log(isPreviewOpen)
    const handleAddField = (type: any) => {
        setFields([
            ...fields,
            {
                id: Date.now(),
                type,
                name: '',
                displayName: '',
                isMandatory: false,
                isEnabled: true,
                visibility: 'Show',
                description: '',
                // Base configuration based on type
                ...(type === 'text' && {
                    question: 'Please provide your answer',
                    placeholder: 'Enter your response...',
                    defaultValue: '',
                    errorMessage: 'Please enter a valid response',
                }),
                ...(type === 'number' && {
                    question: 'Enter a number',
                    placeholder: 'Enter a number...',
                    defaultValue: '',
                    minValue: '',
                    maxValue: '',
                    errorMessage: 'Please enter a valid number',
                }),
                ...(type === 'date' && {
                    question: 'When did this occur?',
                    minDate: '',
                    maxDate: '',
                    dateFormat: 'yyyy-MM-dd',
                    placeholder: 'Select date...',
                    value: null,
                    minDateLabel: 'Earliest allowed date',
                    maxDateLabel: 'Latest allowed date',
                    errorMessage: 'Please select a valid date',
                }),
                ...(type === 'checkbox' && {
                    question: 'Please select applicable options',
                    options: ['Yes', 'No'],
                    defaultValue: [],
                    errorMessage: 'Please select at least one option',
                }),
                ...(type === 'radio' && {
                    question: 'Please select one option',
                    options: ['Option 1', 'Option 2'],
                    defaultValue: '',
                    errorMessage: 'Please select an option',
                }),
                ...(type === 'select' && {
                    question: 'Choose from the dropdown',
                    options: ['Option 1', 'Option 2'],
                    defaultValue: '',
                    placeholder: 'Select an option...',
                    errorMessage: 'Please select an option',
                }),
                ...(type === 'multi-select' && {
                    question: 'Choose multiple options',
                    options: ['Option 1', 'Option 2'],
                    defaultValue: [],
                    placeholder: 'Select options...',
                    errorMessage: 'Please select at least one option',
                }),
                ...(type === 'email' && {
                    question: 'What is your email address?',
                    placeholder: 'Enter email address...',
                    defaultValue: '',
                    errorMessage: 'Please enter a valid email address',
                }),
                ...(type === 'textarea' && {
                    question: 'Please provide detailed response',
                    placeholder: 'Enter your detailed response...',
                    defaultValue: '',
                    rows: 4,
                    errorMessage: 'Please provide a detailed response',
                }),
            },
        ])
    }

    const updateField = (id: number, key: string, value: any) => {
        setFields((prev) =>
            prev.map((field) =>
                field.id === id ? { ...field, [key]: value } : field
            )
        )
    }

    const removeField = (id: number) => {
        setFields((prev) => prev.filter((field) => field.id !== id))
    }

    const handleExport = () => {
        const formData = fields.map(({ id, ...rest }) => rest)
        const blob = new Blob([JSON.stringify(formData, null, 2)], {
            type: 'application/json',
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'form-config.json'
        a.click()
        URL.revokeObjectURL(url)
    }

    const handleFormSubmit = async () => {
        if (fields.length === 0) {
            toast.error('Please add at least one field to the form')
            return
        }

        try {
            setIsSaving(true)
            // Prepare form data
            const formData = fields.map(({ id, ...rest }) => ({
                ...rest,
                createdAt: new Date().toISOString(),
            }))

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log('Form Data:', formData)

            // Launch confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            })

            // Show success animation
            setShowSuccess(true)

            // Don't show preview immediately
            // setIsPreviewOpen(true)

            // Success notification still shows in corner
            toast.success('Form saved successfully!', {
                description: `${fields.length} fields configured`,
            })
        } catch (error) {
            toast.error('Failed to save form', {
                description: 'Please try again',
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-slate-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="mb-8 border-none shadow-md bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/50">
                        <CardContent className="py-8">
                            <div className="flex justify-between items-start gap-8 pt-5">
                                {/* Left Section */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
                                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                                Create Your Form
                                            </h1>
                                        </div>
                                        <p className="text-base text-gray-600 ml-[18px]">
                                            Add and configure your form fields
                                            below
                                        </p>
                                    </div>
                                </div>

                                {/* Right Section - Actions */}
                                <div className="flex items-center gap-3">
                                    {/* Add Field Dropdown */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200 gap-2">
                                                <Plus className="h-4 w-4" />
                                                Add Field
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="w-56 bg-slate-50"
                                        >
                                            {appConstants.fieldTypes.map(
                                                (fieldType) => (
                                                    <DropdownMenuItem
                                                        key={fieldType.type}
                                                        onClick={() =>
                                                            handleAddField(
                                                                fieldType.type
                                                            )
                                                        }
                                                        className="gap-2 py-2 cursor-pointer"
                                                    >
                                                        <fieldType.icon
                                                            className={`h-4 w-4 ${fieldType.color}`}
                                                        />
                                                        <span>
                                                            {fieldType.label}
                                                        </span>
                                                    </DropdownMenuItem>
                                                )
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    {/* Preview Button */}
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsPreviewOpen(true)}
                                        className="gap-2"
                                        disabled={fields.length === 0}
                                    >
                                        <Eye className="h-4 w-4" />
                                        Preview
                                    </Button>

                                    {/* Export Button */}
                                    <Button
                                        variant="outline"
                                        onClick={handleExport}
                                        className="gap-2"
                                        disabled={fields.length === 0}
                                    >
                                        <FileDown className="h-4 w-4" />
                                        Export
                                    </Button>

                                    {/* Save Button */}
                                    <Button
                                        onClick={handleFormSubmit}
                                        className="bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200 gap-2"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Save Form
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form Fields */}
                    {fields.length === 0 ? (
                        <EmptyState onAddField={handleAddField} />
                    ) : (
                        <div className="space-y-6 bg-white">
                            <Accordion
                                type="single"
                                collapsible
                                className="space-y-4"
                            >
                                {fields.map((field, index) => (
                                    <AccordionItem
                                        key={field.id}
                                        value={field.id.toString()}
                                        className="border-none"
                                    >
                                        <Card className="border shadow-sm hover:shadow-md transition-all duration-200">
                                            <AccordionTrigger className="p-0 hover:no-underline [&[data-state=open]>div]:bg-gray-50">
                                                {/* Field Header */}
                                                <div className="w-full p-4 border-b flex items-center justify-between transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-medium">
                                                                    {index + 1}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-medium text-gray-900">
                                                                        {field.displayName ||
                                                                            'Untitled Field'}
                                                                    </span>
                                                                    <Badge
                                                                        variant="secondary"
                                                                        className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                                                                    >
                                                                        {
                                                                            field.type
                                                                        }
                                                                    </Badge>
                                                                    {field.isMandatory && (
                                                                        <Badge
                                                                            variant="secondary"
                                                                            className="bg-red-50 text-red-700 hover:bg-red-100"
                                                                        >
                                                                            Required
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-3 pr-4">
                                                            <Switch
                                                                checked={
                                                                    field.isEnabled
                                                                }
                                                                onChange={(
                                                                    e: React.ChangeEvent<HTMLInputElement>
                                                                ) =>
                                                                    updateField(
                                                                        field.id,
                                                                        'isEnabled',
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                            />
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation()
                                                                    removeField(
                                                                        field.id
                                                                    )
                                                                }}
                                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200" />
                                                    </div>
                                                </div>
                                            </AccordionTrigger>

                                            <AccordionContent>
                                                <CardContent className="p-6 space-y-6 bg-white mt-10">
                                                    <div className="grid grid-cols-2 gap-6">
                                                        <FormFieldWrapper
                                                            label="Field Name"
                                                            required
                                                            htmlFor={`name-${field.id}`}
                                                        >
                                                            <Input
                                                                id={`name-${field.id}`}
                                                                value={
                                                                    field.name
                                                                }
                                                                onChange={(e) =>
                                                                    updateField(
                                                                        field.id,
                                                                        'name',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="e.g., company_assets"
                                                                className="focus:ring-2 focus:ring-blue-100"
                                                            />
                                                        </FormFieldWrapper>

                                                        <FormFieldWrapper
                                                            label="Display Name"
                                                            required
                                                            htmlFor={`display-${field.id}`}
                                                        >
                                                            <Input
                                                                id={`display-${field.id}`}
                                                                value={
                                                                    field.displayName
                                                                }
                                                                onChange={(e) =>
                                                                    updateField(
                                                                        field.id,
                                                                        'displayName',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="e.g., Company Assets"
                                                            />
                                                        </FormFieldWrapper>
                                                    </div>

                                                    {[
                                                        'checkbox',
                                                        'radio',
                                                    ].includes(field.type) && (
                                                        <FormFieldWrapper
                                                            label="Question"
                                                            required
                                                            htmlFor={`question-${field.id}`}
                                                        >
                                                            <Input
                                                                id={`question-${field.id}`}
                                                                value={
                                                                    field.question
                                                                }
                                                                onChange={(e) =>
                                                                    updateField(
                                                                        field.id,
                                                                        'question',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="e.g., Have you returned all company assets (laptop, ID card, access cards, etc.)?"
                                                            />
                                                        </FormFieldWrapper>
                                                    )}

                                                    <FormFieldWrapper
                                                        label="Description"
                                                        htmlFor={`desc-${field.id}`}
                                                    >
                                                        <Input
                                                            id={`desc-${field.id}`}
                                                            value={
                                                                field.description
                                                            }
                                                            onChange={(e) =>
                                                                updateField(
                                                                    field.id,
                                                                    'description',
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder="Help text for this field"
                                                        />
                                                    </FormFieldWrapper>

                                                    {[
                                                        'multi-select',
                                                        'radio',
                                                        'select',
                                                        'checkbox',
                                                    ].includes(field.type) && (
                                                        <FormFieldWrapper
                                                            label="Options"
                                                            required
                                                            htmlFor={`options-${field.id}`}
                                                            // description={
                                                            //     field.type ===
                                                            //     'checkbox'
                                                            //         ? 'Add options for the checkbox question (e.g., Yes, No, N/A)'
                                                            //         : 'Type and press enter to add options'
                                                            // }
                                                        >
                                                            <TagInput
                                                                id={`options-${field.id}`}
                                                                value={
                                                                    field.options
                                                                }
                                                                onChange={(
                                                                    value
                                                                ) =>
                                                                    updateField(
                                                                        field.id,
                                                                        'options',
                                                                        value
                                                                    )
                                                                }
                                                                placeholder={
                                                                    field.type ===
                                                                    'checkbox'
                                                                        ? 'Add options like Yes, No, N/A'
                                                                        : 'Type and press enter to add options'
                                                                }
                                                            />
                                                        </FormFieldWrapper>
                                                    )}

                                                    <div className="grid grid-cols-2 gap-6">
                                                        <FormFieldWrapper
                                                            label="Default Value"
                                                            htmlFor={`default-${field.id}`}
                                                        >
                                                            <Input
                                                                id={`default-${field.id}`}
                                                                value={
                                                                    field.defaultValue
                                                                }
                                                                onChange={(e) =>
                                                                    updateField(
                                                                        field.id,
                                                                        'defaultValue',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="Default value for this field"
                                                            />
                                                        </FormFieldWrapper>

                                                        <FormFieldWrapper
                                                            label="Visibility"
                                                            htmlFor={`visibility-${field.id}`}
                                                        >
                                                            <Select
                                                                value={
                                                                    field.visibility
                                                                }
                                                                onValueChange={(
                                                                    value
                                                                ) =>
                                                                    updateField(
                                                                        field.id,
                                                                        'visibility',
                                                                        value
                                                                    )
                                                                }
                                                            >
                                                                <SelectTrigger
                                                                    id={`visibility-${field.id}`}
                                                                >
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Show">
                                                                        Show
                                                                    </SelectItem>
                                                                    <SelectItem value="Hide">
                                                                        Hide
                                                                    </SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormFieldWrapper>
                                                    </div>

                                                    <div className="flex items-center gap-6">
                                                        <label className="flex items-center gap-2">
                                                            <Checkbox
                                                                checked={
                                                                    field.isMandatory
                                                                }
                                                                onCheckedChange={(
                                                                    checked
                                                                ) =>
                                                                    updateField(
                                                                        field.id,
                                                                        'isMandatory',
                                                                        checked
                                                                    )
                                                                }
                                                            />
                                                            <span>
                                                                Required Field
                                                            </span>
                                                        </label>
                                                    </div>

                                                    {field.isMandatory && (
                                                        <FormFieldWrapper
                                                            label="Error Message"
                                                            required
                                                            htmlFor={`error-${field.id}`}
                                                        >
                                                            <Input
                                                                id={`error-${field.id}`}
                                                                value={
                                                                    field.errorMessage
                                                                }
                                                                onChange={(e) =>
                                                                    updateField(
                                                                        field.id,
                                                                        'errorMessage',
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="Error message when validation fails"
                                                            />
                                                        </FormFieldWrapper>
                                                    )}

                                                    {field.type === 'date' && (
                                                        <>
                                                            <FormFieldWrapper
                                                                label="Question"
                                                                required
                                                                htmlFor={`question-${field.id}`}
                                                            >
                                                                <Input
                                                                    id={`question-${field.id}`}
                                                                    value={
                                                                        field.question
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        updateField(
                                                                            field.id,
                                                                            'question',
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    placeholder="e.g., When was your last day of work?"
                                                                />
                                                            </FormFieldWrapper>

                                                            <div className="grid grid-cols-2 gap-6">
                                                                <FormFieldWrapper
                                                                    label="Min Date"
                                                                    htmlFor={`minDate-${field.id}`}
                                                                >
                                                                    <Input
                                                                        id={`minDate-${field.id}`}
                                                                        type="date"
                                                                        value={
                                                                            field.minDate
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateField(
                                                                                field.id,
                                                                                'minDate',
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Input
                                                                        className="mt-2"
                                                                        placeholder="Label for minimum date"
                                                                        value={
                                                                            field.minDateLabel
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateField(
                                                                                field.id,
                                                                                'minDateLabel',
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </FormFieldWrapper>

                                                                <FormFieldWrapper
                                                                    label="Max Date"
                                                                    htmlFor={`maxDate-${field.id}`}
                                                                >
                                                                    <Input
                                                                        id={`maxDate-${field.id}`}
                                                                        type="date"
                                                                        value={
                                                                            field.maxDate
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateField(
                                                                                field.id,
                                                                                'maxDate',
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <Input
                                                                        className="mt-2"
                                                                        placeholder="Label for maximum date"
                                                                        value={
                                                                            field.maxDateLabel
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            updateField(
                                                                                field.id,
                                                                                'maxDateLabel',
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </FormFieldWrapper>
                                                            </div>
                                                        </>
                                                    )}
                                                </CardContent>
                                            </AccordionContent>
                                        </Card>
                                        {/* Preview Dialog */}
                                        <Dialog
                                            open={isPreviewOpen}
                                            onOpenChange={setIsPreviewOpen}
                                        >
                                            <PreviewForm
                                                fields={fields.filter(
                                                    (f) => f.isEnabled
                                                )}
                                                onClose={() =>
                                                    setIsPreviewOpen(false)
                                                }
                                                isOpen={isPreviewOpen}
                                            />
                                        </Dialog>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}
                </div>
            </div>

            {/* Toast Container */}
            <Toaster position="top-right" />

            <SuccessAnimation
                isOpen={showSuccess}
                onClose={() => {
                    setShowSuccess(false)
                    setIsPreviewOpen(true) // Show preview after closing success animation
                }}
                fields={fields}
            />
        </TooltipProvider>
    )
}
