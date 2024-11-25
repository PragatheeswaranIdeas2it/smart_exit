import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-lg w-full space-y-8">
                {/* Illustration */}
                <div className="flex justify-center">
                    <svg
                        className="w-64 h-64 text-indigo-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={0.5}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                {/* Content */}
                <div className="text-center space-y-6">
                    <h1 className="text-6xl font-bold text-gray-900">404</h1>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-semibold text-gray-900">
                            Page not found
                        </h2>
                        <p className="text-gray-600">
                            Sorry, we couldn't find the page you're looking for.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound
