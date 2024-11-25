import {
    TextIcon,
    Hash,
    Mail,
    AlignLeft,
    List,
    CheckSquare,
    Circle,
    Check,
    Calendar,
    Upload,
} from 'lucide-react'

export const inputTypes = [
    {
        value: 'text',
        label: 'Text Input',
        icon: TextIcon,
        description: 'Single line text input field',
    },
    {
        value: 'number',
        label: 'Number Input',
        icon: Hash,
        description: 'Numeric input field',
    },
    {
        value: 'email',
        label: 'Email Input',
        icon: Mail,
        description: 'Email address input field',
    },
    {
        value: 'textarea',
        label: 'Text Area',
        icon: AlignLeft,
        description: 'Multi-line text input field',
    },
    {
        value: 'select',
        label: 'Select Dropdown',
        icon: List,
        description: 'Single-select dropdown menu',
    },
    {
        value: 'multi-select',
        label: 'Multi Select',
        icon: CheckSquare,
        description: 'Multi-select dropdown menu',
    },
    {
        value: 'radio',
        label: 'Radio Group',
        icon: Circle,
        description: 'Single-select radio buttons',
    },
    {
        value: 'checkbox',
        label: 'Checkbox',
        icon: Check,
        description: 'Single checkbox input',
    },
    {
        value: 'date',
        label: 'Date Picker',
        icon: Calendar,
        description: 'Date selection field',
    },
    {
        value: 'file',
        label: 'File Upload',
        icon: Upload,
        description: 'File upload input field',
    },
]

export interface FormField {
    id: number
    type: string
    name: string
    displayName: string
    options: string[]
    defaultValue: string
    isMandatory: boolean
    isEnabled: boolean
    visibility: 'Show' | 'Hide'
    errorMessage: string
    description: string
}

export type FormFieldUpdate = {
    id: number
    key: keyof FormField
    value: any
}
