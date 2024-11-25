import React from 'react'
import { motion } from 'framer-motion'
import {
    Users,
    Wallet,
    Laptop,
    FolderKanban,
    UserCircle,
    ArrowRight,
} from 'lucide-react'

interface DashboardBoxProps {
    title: string
    icon: React.ReactNode
    bgColor: string
    iconColor: string
    url: string
}

const DashboardBox: React.FC<DashboardBoxProps> = ({
    title,
    icon,
    bgColor,
    iconColor,
    url,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
    >
        <a href={url} className="group block relative h-full">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200">
                <div className="flex items-center justify-between">
                    {/* Icon Container */}
                    <div
                        className={`${bgColor} w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                        <div className={iconColor}>{icon}</div>
                    </div>

                    {/* Arrow Icon */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 0 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-400"
                    >
                        <ArrowRight className="h-5 w-5" />
                    </motion.div>
                </div>

                {/* Title */}
                <h3 className="mt-4 font-semibold text-lg text-gray-900 group-hover:text-gray-700">
                    {title}
                </h3>
            </div>

            {/* Gradient Overlay on Hover */}
            <div
                className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    backgroundImage: `linear-gradient(45deg, ${bgColor.replace('bg-', 'var(--')}/.1, transparent)`,
                }}
            />
        </a>
    </motion.div>
)

const Dashboard = () => {
    const boxes = [
        {
            title: 'HR',
            icon: <Users size={24} />,
            bgColor: 'bg-blue-50',
            iconColor: 'text-blue-500',
            url: '/hr/queries/create',
        },
        {
            title: 'Accounts',
            icon: <Wallet size={24} />,
            bgColor: 'bg-green-50',
            iconColor: 'text-green-500',
            url: '/accounts',
        },
        {
            title: 'IT Team',
            icon: <Laptop size={24} />,
            bgColor: 'bg-purple-50',
            iconColor: 'text-purple-500',
            url: '/it-team',
        },
        {
            title: 'Projects',
            icon: <FolderKanban size={24} />,
            bgColor: 'bg-orange-50',
            iconColor: 'text-orange-500',
            url: '/projects',
        },
        {
            title: 'User',
            icon: <UserCircle size={24} />,
            bgColor: 'bg-indigo-50',
            iconColor: 'text-indigo-500',
            url: '/user',
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto max-w-6xl px-6">
                {/* Header */}
                <motion.div
                    className="mb-10 space-y-1"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-sm text-gray-500">
                        Select a department to continue
                    </p>
                </motion.div>

                {/* Grid Layout */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={{
                        show: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    initial="hidden"
                    animate="show"
                >
                    {boxes.map((box, index) => (
                        <DashboardBox key={index} {...box} />
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default Dashboard
