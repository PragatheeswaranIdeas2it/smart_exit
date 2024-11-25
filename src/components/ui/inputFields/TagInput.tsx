import { useState } from 'react'
import { Input } from '../../InputField'

export interface ITagInputProps {
    id?: string
    value?: string[]
    onChange?: (value: string[]) => void
    defaultValue?: string[]
    label?: string
    required?: boolean
    disabled?: boolean
    error?: string
    allowOnlyNumbers?: boolean
    fromChiefDom?: boolean
    placeholder?: string
}

/**
 * TagInput Component: A dynamic input for adding/removing tags.
 */
const TagInput = ({
    id,
    value,
    defaultValue = [],
    onChange,
    label,
    disabled,
    error = '',
    allowOnlyNumbers = false,
    fromChiefDom = false,
    placeholder = 'Add a tag',
    ...props
}: ITagInputProps) => {
    const [items, setItems] = useState<string[]>(defaultValue || [])
    const [inputValue, setInput] = useState<string>('')

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = fromChiefDom
            ? evt.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
            : evt.target.value
        setInput(value)
    }

    const handleInputKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key === 'Enter') {
            const value = inputValue.trim()
            const isOnlyNumber = allowOnlyNumbers ? /^\d+$/.test(value) : true

            if (value && !items.includes(value) && isOnlyNumber) {
                const updatedItems = [...items, value]
                setItems(updatedItems)
                onChange?.(updatedItems)
                setInput('')
            }
            evt.preventDefault()
        } else if (
            evt.key === 'Backspace' &&
            !inputValue.length &&
            items.length
        ) {
            const updatedItems = items.slice(0, -1)
            setItems(updatedItems)
            onChange?.(updatedItems)
        }
    }

    const handleRemoveItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index)
        setItems(updatedItems)
        onChange?.(updatedItems)
    }

    return (
        <div className="mb-4">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}{' '}
                    {props.required && <span className="text-red-500">*</span>}
                </label>
            )}
            <ul
                className={`flex flex-wrap items-center border ${
                    error ? 'border-red-500' : 'border-gray-300'
                } rounded-lg p-2 gap-2 ${
                    disabled ? 'bg-gray-100 pointer-events-none' : ''
                }`}
            >
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-800"
                    >
                        {item}
                        <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                            aria-label="Remove tag"
                        >
                            &times;
                        </button>
                    </li>
                ))}
                {!disabled && (
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        className="flex-grow focus:outline-none px-2 py-1 text-sm"
                        placeholder="Add a tag"
                        {...props}
                    />
                )}
            </ul>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    )
}

export default TagInput
