import { toast } from 'sonner'

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID!
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY!
const DISCOVERY_DOC =
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const SCOPES = 'https://www.googleapis.com/auth/calendar'

interface CalendarEvent {
    summary: string
    description: string
    startTime: Date
    endTime: Date
    attendees: string[]
    timeZone?: string
}

let tokenClient: {
    callback: (resp: any) => void
    requestAccessToken: (options?: { prompt: string }) => void
}

const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = (e) => reject(e)
        document.head.appendChild(script)
    })
}

const initializeGoogleApi = async () => {
    try {
        // Load the Google API client library
        await loadScript('https://apis.google.com/js/api.js')
        // Load the Google Identity Services library
        await loadScript('https://accounts.google.com/gsi/client')

        // Initialize the GAPI client
        await new Promise<void>((resolve) => {
            window.gapi.load('client', resolve)
        })

        // Initialize the GAPI client with API key and discovery docs
        await window.gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        })

        // Initialize the token client
        tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        })
    } catch (error) {
        console.error('Error initializing Google API:', error)
        throw error
    }
}

const getAccessToken = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            tokenClient.callback = async (resp: any) => {
                if (resp.error !== undefined) {
                    reject(resp)
                }
                resolve(resp.access_token)
            }
            tokenClient.requestAccessToken({ prompt: 'consent' })
        } catch (err) {
            reject(err)
        }
    })
}

export const createCalendarEvent = async (eventDetails: CalendarEvent) => {
    try {
        if (!window.gapi?.client) {
            await initializeGoogleApi()
        }

        await getAccessToken()

        const event = {
            summary: eventDetails.summary,
            description: eventDetails.description,
            start: {
                dateTime: eventDetails.startTime.toISOString(),
                timeZone:
                    eventDetails.timeZone ||
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            end: {
                dateTime: eventDetails.endTime.toISOString(),
                timeZone:
                    eventDetails.timeZone ||
                    Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            attendees: eventDetails.attendees.map((email) => ({ email })),
            conferenceData: {
                createRequest: {
                    requestId: `meet-${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            },
        }

        const response = await window.gapi.client.calendar.events.insert({
            calendarId: 'primary',
            conferenceDataVersion: 1,
            resource: event,
        })

        return {
            success: true,
            eventLink: response.result.htmlLink,
            meetLink: response.result.conferenceData?.entryPoints?.[0]?.uri,
            eventId: response.result.id,
        }
    } catch (error) {
        console.error('Error creating calendar event:', error)
        toast.error('Failed to create calendar event')
        throw error
    }
}

// scheduleTomorrowMeeting remains the same
export const scheduleTomorrowMeeting = async ({
    summary,
    description,
    durationMinutes = 60,
    attendees,
}: {
    summary: string
    description: string
    durationMinutes?: number
    attendees: string[]
}) => {
    const startTime = new Date()
    startTime.setDate(startTime.getDate() + 1)
    startTime.setHours(10, 0, 0, 0)

    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + durationMinutes)

    return createCalendarEvent({
        summary,
        description,
        startTime,
        endTime,
        attendees,
    })
}
