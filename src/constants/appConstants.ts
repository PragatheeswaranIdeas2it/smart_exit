import {
    Plus,
    TextIcon,
    ListIcon,
    CheckSquare,
    RadioIcon,
    ToggleLeft,
    Mail,
    Calendar,
} from 'lucide-react'
export const appConstants = {
    appName: 'Smart Exit',
    bgColors: [
        'bg-red-400',
        'bg-blue-400',
        'bg-green-400',
        'bg-yellow-400',
        'bg-purple-400',
    ],
    fieldTypes: [
        {
            type: 'text',
            label: 'Text Field',
            icon: TextIcon,
            description: 'Single line text input',
            color: 'bg-blue-50 text-blue-600',
        },
        {
            type: 'select',
            label: 'Dropdown',
            icon: ListIcon,
            description: 'Select from options',
            color: 'bg-purple-50 text-purple-600',
        },
        {
            type: 'checkbox',
            label: 'Checkbox',
            icon: CheckSquare,
            description: 'Multiple choice selection',
            color: 'bg-green-50 text-green-600',
        },
        {
            type: 'radio',
            label: 'Radio',
            icon: RadioIcon,
            description: 'Single choice selection',
            color: 'bg-orange-50 text-orange-600',
        },
        {
            type: 'switch',
            label: 'Switch',
            icon: ToggleLeft,
            description: 'Toggle between two states',
            color: 'bg-indigo-50 text-indigo-600',
        },
        {
            type: 'email',
            label: 'Email Field',
            icon: Mail,
            color: 'text-pink-600',
            description: 'Email address input',
        },
        {
            type: 'date',
            label: 'Date Picker',
            icon: Calendar,
            color: 'text-cyan-600',
            description: 'Date selection field',
        },
    ],
    // hr
    OFFBOARDING_QUESTION: 'Is offboarding interview completed?',
}
