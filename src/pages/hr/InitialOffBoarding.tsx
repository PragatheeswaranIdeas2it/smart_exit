import React, { useState } from 'react'
import { EmployeeDetails } from '../../components/ui/EmployeeDetails'
import { Textarea } from '../../components/ui/inputFields/TextareaInput'
import { appConstants } from '../../constants/appConstants'
import { MeetingScheduler } from '../../components/MeetingScheduler/MeetingScheduler'
import { toast } from 'sonner'
import { Video, Calendar, Link as LinkIcon, ExternalLink } from 'lucide-react'

interface Employee {
    name: string
    email: string
    role: string
    phone: string
    joinDate: string
    status: 'active'
    imageUrl: string
    remainingDays: number
    designation: string
    currentProject: string
    experience: string
    department: string
}

interface MeetingDetails {
    eventLink?: string
    meetLink?: string
    scheduledTime?: string
}

const Offboarding = () => {
    const [isInterviewCompleted, setIsInterviewCompleted] = useState(false)
    const [comments, setComments] = useState('')
    const [meetingDetails, setMeetingDetails] = useState<MeetingDetails | null>(
        null
    )

    const employee: Employee = {
        name: 'John Doe',
        email: 'john.doe@company.com',
        role: 'Senior Software Engineer',
        phone: '+1 (555) 123-4567',
        joinDate: 'Jan 2023',
        status: 'active',
        imageUrl: '',
        remainingDays: 15,
        designation: 'Senior Software Engineer',
        currentProject: 'Project Beta',
        experience: '5+ years',
        department: 'Engineering',
    }

    const handleMeetingScheduled = (details: MeetingDetails) => {
        setMeetingDetails(details)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Employee Offboarding
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage exit process and schedule interview
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Employee Details Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Employee Information
                        </h2>
                        <EmployeeDetails emp={employee} />
                    </div>

                    {/* Meeting Details Card - Show when meeting is scheduled */}
                    {meetingDetails && (
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                    <Video className="w-5 h-5 text-blue-600" />
                                    Scheduled Interview
                                </h2>
                                <span className="text-sm text-gray-500">
                                    Tomorrow at 10:00 AM
                                </span>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Google Meet Link */}
                                {meetingDetails.meetLink && (
                                    <div className="bg-blue-50 rounded-lg p-4 flex items-center justify-between group hover:bg-blue-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Video className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="font-medium text-blue-600">
                                                    Google Meet
                                                </p>
                                                <p className="text-sm text-blue-500">
                                                    Click to join meeting
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={meetingDetails.meetLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Join
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}

                                {/* Calendar Link */}
                                {meetingDetails.eventLink && (
                                    <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between group hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-gray-600" />
                                            <div>
                                                <p className="font-medium text-gray-700">
                                                    Calendar Event
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    View in Google Calendar
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href={meetingDetails.eventLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            View
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Quick Copy Section */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        Meeting Link
                                    </span>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                meetingDetails.meetLink || ''
                                            )
                                            toast.success(
                                                'Meeting link copied to clipboard!'
                                            )
                                        }}
                                        className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                    >
                                        <LinkIcon className="w-4 h-4" />
                                        Copy Link
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-1 truncate">
                                    {meetingDetails.meetLink}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Exit Interview Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">
                            Exit Interview Status
                        </h2>

                        {/* Toggle Section */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
                            <label className="text-gray-700 font-medium">
                                {appConstants.OFFBOARDING_QUESTION}
                            </label>
                            <button
                                onClick={() => {
                                    setIsInterviewCompleted((prev) => !prev)
                                    setComments('')
                                }}
                                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none"
                                style={{
                                    backgroundColor: isInterviewCompleted
                                        ? '#10B981'
                                        : '#6B7280',
                                }}
                            >
                                <span
                                    className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                                        isInterviewCompleted
                                            ? 'translate-x-6'
                                            : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>

                        {/* Conditional Rendering based on Interview Status */}
                        {!isInterviewCompleted ? (
                            <div className="mt-6">
                                <MeetingScheduler
                                    employeeName={employee.name}
                                    employeeEmail={employee.email}
                                    hrEmail="hr@company.com"
                                    onMeetingScheduled={handleMeetingScheduled}
                                />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-green-800">
                                        Exit interview has been completed.
                                        Please provide your comments below.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="comments"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Interview Comments
                                    </label>
                                    <Textarea
                                        id="comments"
                                        value={comments}
                                        onChange={(e) =>
                                            setComments(e.target.value)
                                        }
                                        placeholder="Enter your comments about the exit interview..."
                                        className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <button
                                    onClick={() => {
                                        if (comments.trim()) {
                                            toast.success(
                                                'Comments saved successfully!'
                                            )
                                        } else {
                                            toast.error(
                                                'Please enter comments before submitting'
                                            )
                                        }
                                    }}
                                    disabled={!comments.trim()}
                                    className={`w-full py-2 px-4 rounded-lg transition-all duration-200 ${
                                        comments.trim()
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    Submit Comments
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Offboarding
