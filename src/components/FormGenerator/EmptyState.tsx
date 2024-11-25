import React from 'react'
import { PlusIcon, FileText } from 'lucide-react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface EmptyStateProps {
    onAddField: (type: any) => void
}

export function EmptyState({ onAddField }: EmptyStateProps) {
    return (
        <Card className="border-2 border-dashed">
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="relative mb-6">
                    {/* Background decoration */}
                    <div className="absolute -inset-4">
                        <div className="w-full h-full mx-auto rotate-6">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl blur-lg" />
                            <div className="relative">
                                <div className="h-24 w-24 rounded-xl bg-white shadow-sm border-2 border-blue-100" />
                            </div>
                        </div>
                    </div>

                    {/* Icon */}
                    <div className="relative h-16 w-16 rounded-xl bg-blue-50 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                </div>

                <div className="text-center max-w-sm space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                        No Form Fields Added
                    </h3>
                    <p className="text-sm text-gray-500">
                        Get started by adding your first form field. You can add
                        text inputs, selections, and more to create your custom
                        form.
                    </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Button
                        onClick={() => onAddField('text')}
                        className="gap-2"
                        size="lg"
                    >
                        <PlusIcon className="h-4 w-4" />
                        Add Text Field
                    </Button>
                </div>
            </div>
        </Card>
    )
}
