import React, { useState } from 'react'
import {
    CalendarPlus,
    Video,
    Users,
    Clock,
    Calendar,
    CheckCircle,
    ExternalLink,
    ChevronDown,
} from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format, parseISO } from 'date-fns'
import { createCalendarEvent } from '../../config/googleCalendar'
import { toast } from 'sonner'

interface MeetingSchedulerProps {
    employeeName: string
    employeeEmail: string
    hrEmail: string
    onMeetingScheduled?: (details: {
        eventLink?: string
        meetLink?: string
        scheduledTime?: string
    }) => void
}
interface MeetingDetails {
    eventLink?: string
    meetLink?: string
    scheduledTime?: string
}
export const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({
    employeeName,
    employeeEmail,
    hrEmail,
    onMeetingScheduled,
}) => {
    const [isScheduling, setIsScheduling] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<Date | null>(null)
    const [duration, setDuration] = useState(60)
    const [isScheduled, setIsScheduled] = useState(false)
    const [meetingDetails, setMeetingDetails] = useState<MeetingDetails | null>(
        null
    )

    // Custom time options (11 AM to 4 PM)
    const timeOptions = [
        '11:00 AM',
        '11:30 AM',
        '12:00 PM',
        '12:30 PM',
        '1:00 PM',
        '1:30 PM',
        '2:00 PM',
        '2:30 PM',
        '3:00 PM',
        '3:30 PM',
        '4:00 PM',
    ]

    const handleTimeSelect = (timeStr: string) => {
        const [hours, minutes, period] = timeStr
            .match(/(\d+):(\d+) (AM|PM)/)!
            .slice(1)
        const date = new Date()
        const hour =
            parseInt(hours) + (period === 'PM' && hours !== '12' ? 12 : 0)
        date.setHours(hour)
        date.setMinutes(parseInt(minutes))
        setSelectedTime(date)
    }

    const handleScheduleMeeting = async () => {
        if (!selectedDate || !selectedTime) {
            toast.error('Please select both date and time')
            return
        }

        setIsScheduling(true)
        try {
            // Combine date and time properly
            const meetingDateTime = new Date(selectedDate)
            meetingDateTime.setHours(selectedTime.getHours())
            meetingDateTime.setMinutes(selectedTime.getMinutes())

            // Calculate end time
            const endDateTime = new Date(meetingDateTime)
            endDateTime.setMinutes(meetingDateTime.getMinutes() + duration)

            const result = await createCalendarEvent({
                summary: `Exit Interview - ${employeeName}`,
                description: `Exit Interview meeting with ${employeeName}`,
                startTime: meetingDateTime,
                endTime: endDateTime,
                attendees: [employeeEmail, hrEmail],
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })

            const formattedScheduledTime = format(
                meetingDateTime,
                "yyyy-MM-dd'T'HH:mm:ssXXX"
            )

            const meetingInfo = {
                ...result,
                scheduledTime: formattedScheduledTime,
            }

            setMeetingDetails(meetingInfo)
            setIsScheduled(true)

            if (onMeetingScheduled) {
                onMeetingScheduled(meetingInfo)
            }

            toast.success('Meeting scheduled successfully!')
        } catch (error) {
            toast.error('Failed to schedule meeting')
            console.error(error)
        } finally {
            setIsScheduling(false)
        }
    }

    if (isScheduled && meetingDetails) {
        const scheduledDateTime = parseISO(meetingDetails?.scheduledTime || '')

        return (
            <div className="bg-white rounded-xl shadow-lg p-8">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        Exit Interview Scheduled!
                    </h3>
                    <p className="text-gray-500 mt-2">
                        The meeting has been scheduled and invites have been
                        sent
                    </p>
                </div>

                {/* Meeting Details Card */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className="space-y-4">
                        {/* Date & Time */}
                        <div className="flex items-start space-x-3">
                            <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {format(
                                        scheduledDateTime,
                                        'EEEE, MMMM d, yyyy'
                                    )}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {format(scheduledDateTime, 'h:mm a')} •{' '}
                                    {duration} minutes
                                </p>
                            </div>
                        </div>

                        {/* Attendees */}
                        <div className="flex items-start space-x-3">
                            <Users className="w-5 h-5 text-gray-400 mt-1" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Attendees
                                </p>
                                <p className="text-sm text-gray-500">
                                    {employeeName}, HR Team
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    {/* Join Meeting Button */}
                    <a
                        href={meetingDetails.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                    >
                        <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                            <Video className="w-5 h-5" />
                            <span>Join Google Meet</span>
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </button>
                    </a>

                    {/* Add to Calendar Button */}
                    <a
                        href={meetingDetails.eventLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                    >
                        <button className="w-full bg-white text-gray-700 px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                            <Calendar className="w-5 h-5" />
                            <span>Add to Calendar</span>
                            <ExternalLink className="w-4 h-4 ml-2" />
                        </button>
                    </a>
                </div>
            </div>
        )
    }

    if (!isScheduled) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                            Schedule Exit Interview
                        </h3>
                        <p className="text-gray-500 mt-1">
                            Select your preferred date and time
                        </p>
                    </div>
                    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Date and Time Selection Row */}
                    <div className="flex gap-6">
                        {/* Date Selection */}
                        <div className="flex-1 space-y-2.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Interview Date
                            </label>
                            <div className="relative">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    minDate={new Date()}
                                    className="w-full h-[48px] px-4 pl-11 text-base text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all duration-200 bg-white placeholder:text-gray-400"
                                    dateFormat="EEE, MMM d, yyyy"
                                    placeholderText="e.g. Mon, Jan 15, 2024"
                                    calendarClassName="shadow-xl border-0 rounded-lg"
                                    showPopperArrow={false}
                                    autoComplete="off"
                                />
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Time Selection */}
                        <div className="flex-1 space-y-2.5">
                            <label className="block text-sm font-medium text-gray-700">
                                Interview Time
                            </label>
                            <div className="relative">
                                <select
                                    value={
                                        selectedTime
                                            ? format(selectedTime, 'h:mm aa')
                                            : ''
                                    }
                                    onChange={(e) =>
                                        handleTimeSelect(e.target.value)
                                    }
                                    className="w-full h-[48px] px-4 pl-11 text-base text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all duration-200 bg-white appearance-none placeholder:text-gray-400"
                                >
                                    <option value="">e.g. 11:00 AM</option>
                                    {timeOptions.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                </div>
                                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Duration Selection */}
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Interview Duration
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                            {[30, 60, 90, 120].map((mins) => (
                                <button
                                    key={mins}
                                    onClick={() => setDuration(mins)}
                                    className={`
                                        p-3 rounded-xl text-center transition-all
                                        ${
                                            duration === mins
                                                ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-600 font-medium'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }
                                    `}
                                >
                                    {mins < 60 ? `${mins}m` : `${mins / 60}h`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Meeting Details Card */}
                    {(selectedDate || selectedTime) && (
                        <div className="bg-blue-50 rounded-xl p-5 space-y-4">
                            <h4 className="font-medium text-blue-900">
                                Meeting Details
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-blue-700">
                                    <Users className="w-5 h-5" />
                                    <span>
                                        <span className="font-medium">
                                            {employeeName}
                                        </span>{' '}
                                        & HR Team
                                    </span>
                                </div>
                                {selectedDate && selectedTime && (
                                    <div className="flex items-center gap-3 text-blue-700">
                                        <Clock className="w-5 h-5" />
                                        <div>
                                            <span className="font-medium">
                                                {format(selectedTime, 'h:mm a')}
                                            </span>
                                            <span className="mx-2">•</span>
                                            {duration} minutes
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Schedule Button */}
                    <button
                        onClick={handleScheduleMeeting}
                        disabled={
                            isScheduling || !selectedDate || !selectedTime
                        }
                        className={`
                            w-full p-4 rounded-xl flex items-center justify-center gap-3
                            transition-all duration-200 text-base font-medium
                            ${
                                isScheduling || !selectedDate || !selectedTime
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                            }
                        `}
                    >
                        {isScheduling ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Scheduling...</span>
                            </>
                        ) : (
                            <>
                                <CalendarPlus className="w-5 h-5" />
                                <span>Schedule Interview</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                        Schedule Exit Interview
                    </h3>
                    <p className="text-gray-500 mt-1">
                        Select your preferred date and time
                    </p>
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                </div>
            </div>

            <div className="space-y-8">
                {/* Date and Time Selection Row */}
                <div className="flex gap-6">
                    {/* Date Selection */}
                    <div className="flex-1 space-y-2.5">
                        <label className="block text-sm font-medium text-gray-700">
                            Interview Date
                        </label>
                        <div className="relative">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                minDate={new Date()}
                                className="w-full h-[48px] px-4 pl-11 text-base text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all duration-200 bg-white placeholder:text-gray-400"
                                dateFormat="EEE, MMM d, yyyy"
                                placeholderText="e.g. Mon, Jan 15, 2024"
                                calendarClassName="shadow-xl border-0 rounded-lg"
                                showPopperArrow={false}
                                autoComplete="off"
                            />
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Time Selection */}
                    <div className="flex-1 space-y-2.5">
                        <label className="block text-sm font-medium text-gray-700">
                            Interview Time
                        </label>
                        <div className="relative">
                            <select
                                value={
                                    selectedTime
                                        ? format(selectedTime, 'h:mm aa')
                                        : ''
                                }
                                onChange={(e) =>
                                    handleTimeSelect(e.target.value)
                                }
                                className="w-full h-[48px] px-4 pl-11 text-base text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all duration-200 bg-white appearance-none placeholder:text-gray-400"
                            >
                                <option value="">e.g. 11:00 AM</option>
                                {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Clock className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Duration Selection */}
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Interview Duration
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                        {[30, 60, 90, 120].map((mins) => (
                            <button
                                key={mins}
                                onClick={() => setDuration(mins)}
                                className={`
                                    p-3 rounded-xl text-center transition-all
                                    ${
                                        duration === mins
                                            ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-600 font-medium'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }
                                `}
                            >
                                {mins < 60 ? `${mins}m` : `${mins / 60}h`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Enhanced Meeting Details */}
                {(selectedDate || selectedTime) && (
                    <div className="bg-blue-50 rounded-xl p-5 space-y-4">
                        <h4 className="font-medium text-blue-900">
                            Meeting Details
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-blue-700">
                                <Users className="w-5 h-5" />
                                <span>
                                    <span className="font-medium">
                                        {employeeName}
                                    </span>{' '}
                                    & HR Team
                                </span>
                            </div>
                            {selectedDate && selectedTime && (
                                <div className="flex items-center gap-3 text-blue-700">
                                    <Clock className="w-5 h-5" />
                                    <div>
                                        <span className="font-medium">
                                            {format(selectedTime, 'h:mm a')}
                                        </span>
                                        <span className="mx-2">•</span>
                                        {duration} minutes
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Enhanced Schedule Button */}
                <button
                    onClick={handleScheduleMeeting}
                    disabled={isScheduling || !selectedDate || !selectedTime}
                    className={`
                        w-full p-4 rounded-xl flex items-center justify-center gap-3
                        transition-all duration-200 text-base font-medium
                        ${
                            isScheduling || !selectedDate || !selectedTime
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md transform hover:-translate-y-0.5'
                        }
                    `}
                >
                    {isScheduling ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Scheduling...</span>
                        </>
                    ) : (
                        <>
                            <CalendarPlus className="w-5 h-5" />
                            <span>Schedule Interview</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
