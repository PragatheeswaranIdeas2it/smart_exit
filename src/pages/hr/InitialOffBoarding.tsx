import React, { useState } from 'react'
import { EmployeeDetails } from '../../components/ui/EmployeeDetails'
import { Textarea } from '../../components/ui/inputFields/TextareaInput'
import { appConstants } from '../../constants/appConstants'
import { scheduleTomorrowMeeting } from '../../config/googleCalendar'
import { toast } from 'sonner'
import { CalendarPlus, Video } from 'lucide-react'

const Offboarding = () => {
    const [isInterviewCompleted, setIsInterviewCompleted] = useState(true)
    const [comments, setComments] = useState('')
    const [isScheduling, setIsScheduling] = useState(false)
    const [meetLink, setMeetLink] = useState<string | null>(null)

    const employee = {
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

    const handleScheduleInterview = async () => {
        setIsScheduling(true)
        try {
            const result = await scheduleTomorrowMeeting({
                summary: `Exit Interview - ${employee.name}`,
                description: `Exit Interview for ${employee.name} (${employee.designation}) from ${employee.department}`,
                durationMinutes: 60,
                attendees: [employee.email, 'hr@company.com'],
            })

            setMeetLink(result.meetLink || null)

            toast.success('Interview scheduled successfully!', {
                description: (
                    <div className="mt-2 space-y-2">
                        <p>
                            Calendar invites have been sent to all participants.
                        </p>
                        <p className="text-sm text-gray-600">
                            The meeting is scheduled for tomorrow at 10:00 AM
                        </p>
                    </div>
                ),
            })
        } catch (error) {
            toast.error('Failed to schedule interview', {
                description: 'Please try again or contact IT support.',
            })
            console.error('Error scheduling interview:', error)
        } finally {
            setIsScheduling(false)
        }
    }

    return (
        <div className="p-8 m-4 bg-white max-w-7xl mx-auto rounded-xl shadow-lg">
            {/* Employee Details Card */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <EmployeeDetails
                    emp={{ ...employee, status: 'active' as const }}
                />
            </div>

            {/* Exit Interview Form */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                    Exit Interview Form
                </h2>

                {/* Toggle Section */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg">
                    <label className="text-gray-800 font-medium flex-grow">
                        {appConstants.OFFBOARDING_QUESTION}
                    </label>
                    <button
                        onClick={() => {
                            setIsInterviewCompleted((prev) => !prev)
                            setComments('')
                            setMeetLink(null)
                        }}
                        className={`w-16 h-8 rounded-full flex items-center px-1 transition-all duration-300 ${
                            isInterviewCompleted ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                    >
                        <span
                            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                isInterviewCompleted ? 'translate-x-8' : ''
                            }`}
                        />
                    </button>
                </div>

                {/* Schedule Interview Section */}
                {!isInterviewCompleted && (
                    <div className="mt-6 bg-white p-6 rounded-lg">
                        <div className="space-y-4">
                            <button
                                onClick={handleScheduleInterview}
                                disabled={isScheduling || !!meetLink}
                                className={`flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg transition-all duration-200 ${
                                    isScheduling || meetLink
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600 transform hover:-translate-y-0.5'
                                } text-white font-medium`}
                            >
                                {isScheduling ? (
                                    'Scheduling...'
                                ) : meetLink ? (
                                    'Interview Scheduled'
                                ) : (
                                    <>
                                        <Video className="w-5 h-5" />
                                        <CalendarPlus className="w-5 h-5" />
                                        Schedule Exit Interview
                                    </>
                                )}
                            </button>

                            {meetLink && (
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Interview has been scheduled for
                                        tomorrow at 10:00 AM
                                    </p>
                                    <a
                                        href={meetLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
                                    >
                                        <Video className="w-4 h-4" />
                                        Join Google Meet
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Comments Section */}
                {isInterviewCompleted && (
                    <div className="mt-6 bg-white p-6 rounded-lg">
                        <label
                            htmlFor="comments"
                            className="block text-gray-800 font-medium mb-3"
                        >
                            Employee's Comments:
                        </label>
                        <Textarea
                            id="comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            rows={4}
                            placeholder="Please share your thoughts and feedback..."
                        />

                        <button
                            disabled={!comments.trim()}
                            className={`mt-6 px-8 py-3 text-white font-medium rounded-lg transition-all duration-200 ${
                                comments.trim()
                                    ? 'bg-blue-500 hover:bg-blue-600 transform hover:-translate-y-0.5'
                                    : 'bg-gray-300 cursor-not-allowed'
                            }`}
                            onClick={() =>
                                alert('Form submitted successfully!')
                            }
                        >
                            Submit Feedback
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Offboarding
