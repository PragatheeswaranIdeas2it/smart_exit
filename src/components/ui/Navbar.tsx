import React from 'react'
import { LogOut, Settings, User, Bell, Search } from 'lucide-react'
import { appConstants } from '../../constants/appConstants'
import { Button } from './Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import Input from './form/Input'

const Navbar = () => {
    const handleLogout = () => {
        // Handle logout logic here
        console.log('Logged out')
    }

    return (
        <nav className="sticky top-0 z-50 border-b bg-white/50 backdrop-blur-sm supports-[backdrop-filter]:bg-white/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-8">
                        <a
                            href="/"
                            className="flex items-center gap-2 text-blue-600"
                        >
                            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                <span className="text-lg font-bold text-white">
                                    SE
                                </span>
                            </div>
                            <span className="text-xl font-bold">
                                {appConstants.appName}
                            </span>
                        </a>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-9 w-9 rounded-full"
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56 bg-slate-50"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuItem
                                    className="gap-2 text-red-600 focus:text-red-600"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
