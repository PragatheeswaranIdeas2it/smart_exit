import React from 'react'
import { getInitial } from '../../utils/utils'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import { Badge } from './Badge'
import {
    Mail,
    Phone,
    Calendar,
    Briefcase,
    Target,
    Clock,
    Award,
    Building,
} from 'lucide-react'

interface IEmployee {
    imageUrl?: string
    name: string
    email: string
    role?: string
    location?: string
    phone?: string
    joinDate?: string
    status?: 'active' | 'inactive' | 'on-leave'
    remainingDays: number
    designation: string
    currentProject: string
    experience: string // Add this field
    department?: string
}

interface EmployeeDetailsProps {
    emp: IEmployee
}

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({ emp }) => {
    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800'
            case 'inactive':
                return 'bg-red-100 text-red-800'
            case 'on-leave':
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getRemainingDaysColor = (days: number) => {
        if (days < 10) return 'bg-red-100 text-red-700'
        if (days <= 30 && days > 10) return 'bg-orange-100 text-orange-700'
        return 'bg-green-100 text-green-700'
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex flex-col space-y-6">
                {/* Top Section */}
                <div className="flex items-start gap-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center space-y-2">
                        <Avatar className="h-24 w-24 ring-2 ring-indigo-500/10">
                            {emp.imageUrl ? (
                                <AvatarImage
                                    src={emp.imageUrl}
                                    alt={emp.name}
                                />
                            ) : (
                                <AvatarFallback className="text-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                                    {getInitial(emp.name)}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        {emp.status && (
                            <Badge
                                className={`${getStatusColor(emp.status)} capitalize`}
                            >
                                {emp.status.replace('-', ' ')}
                            </Badge>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 poppins-semibold">
                                {emp.name}
                            </h2>
                            <p className="text-indigo-600 font-medium poppins-medium flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                {emp.designation}
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Mail className="h-4 w-4" />
                                <span className="text-sm">{emp.email}</span>
                            </div>
                            {emp.phone && (
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Phone className="h-4 w-4" />
                                    <span className="text-sm">{emp.phone}</span>
                                </div>
                            )}
                            {emp.joinDate && (
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">
                                        Joined {emp.joinDate}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Updated Bottom Section with Experience */}
                <div className="border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Remaining Days */}
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Clock className="h-5 w-5 text-indigo-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Remaining Days
                                </p>
                                <span
                                    className={`
                                    font-semibold px-3 py-1 rounded-full text-sm
                                    ${getRemainingDaysColor(emp.remainingDays)}
                                `}
                                >
                                    {emp.remainingDays} days
                                </span>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                                <Award className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Experience
                                </p>
                                <p className="font-semibold text-gray-900">
                                    {emp.experience}
                                </p>
                            </div>
                        </div>

                        {/* Current Project */}
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Target className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Current Project
                                </p>
                                <p className="font-semibold text-gray-900">
                                    {emp.currentProject}
                                </p>
                            </div>
                        </div>

                        {/* Department */}
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <Building className="h-5 w-5 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Department
                                </p>
                                <p className="font-semibold text-gray-900">
                                    {emp.department}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails
