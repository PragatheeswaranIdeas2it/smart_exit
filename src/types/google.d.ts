declare interface Window {
    gapi: {
        load: (api: string, callback: () => void) => void
        client: {
            init: (config: {
                apiKey: string
                discoveryDocs: string[]
            }) => Promise<void>
            calendar: {
                events: {
                    insert: (params: {
                        calendarId: string
                        conferenceDataVersion: number
                        resource: any
                    }) => Promise<{
                        result: {
                            htmlLink: string
                            conferenceData?: {
                                entryPoints?: Array<{
                                    uri: string
                                }>
                            }
                            id: string
                        }
                    }>
                }
            }
        }
    }
    google: {
        accounts: {
            oauth2: {
                initTokenClient: (config: {
                    client_id: string
                    scope: string
                    callback: string | ((resp: any) => void)
                }) => {
                    callback: (resp: any) => void
                    requestAccessToken: (options?: { prompt: string }) => void
                }
            }
        }
    }
}
