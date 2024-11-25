'use client'

import { useMemo, useState } from 'react'
import { Input } from '../components/InputField'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/Select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../components/Table'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../components/ui/Pagination'
import { Search, ChevronUp, ChevronDown, CalendarPlus, Eye } from 'lucide-react'
import { appConstants } from '../constants/appConstants'
import { getInitial } from '../utils/utils'

// Sample employee resignation data
const employees = [
    {
        id: 'I23001',
        name: 'John Doe',
        designation: 'Software Engineer',
        project: 'Project Alpha',
        noticePeriod: 3,
        status: 'Pending',
        imageUrl: '',
    },
    {
        id: 'I23002',
        name: 'Jane Smith',
        designation: 'Product Manager',
        project: 'Project Beta',
        noticePeriod: 45,
        status: 'yet to be started',
        imageUrl: '',
    },
    {
        id: 'I23003',
        name: 'Mike Johnson',
        designation: 'UX Designer',
        project: 'Project Gamma',
        noticePeriod: 14,
        status: 'yet to be started',
        imageUrl: '',
    },
    {
        id: 'I23004',
        name: 'Emily Brown',
        designation: 'Data Analyst',
        project: 'Project Delta',
        noticePeriod: 30,
        status: 'yet to be started',
        imageUrl: '',
    },
    {
        id: 'I23005',
        name: 'Chris Wilson',
        designation: 'DevOps Engineer',
        project: 'Project Alpha',
        noticePeriod: 6,
        status: 'pending',
        imageUrl: '',
    },
    {
        id: 'I23006',
        name: 'Sarah Davis',
        designation: 'QA Tester',
        project: 'Project Beta',
        noticePeriod: 21,
        status: 'pending',
    },
    {
        id: 'I23007',
        name: 'Tom Anderson',
        designation: 'Frontend Developer',
        project: 'Project Gamma',
        noticePeriod: 30,
        status: 'pending',
        imageUrl: '',
    },
    {
        id: 'I23008',
        name: 'Lisa Taylor',
        designation: 'Backend Developer',
        project: 'Project Delta',
        noticePeriod: 45,
        status: 'pending',
        imageUrl: '',
    },
    {
        id: 'I23009',
        name: 'Alex Martinez',
        designation: 'Scrum Master',
        project: 'Project Alpha',
        noticePeriod: 14,
        status: 'pending',
        imageUrl: '',
    },
    {
        id: 'I23010',
        name: 'Rachel Lee',
        designation: 'Business Analyst',
        project: 'Project Beta',
        noticePeriod: 30,
        status: 'pending',
        imageUrl: '',
    },
]

type Employee = {
    id: string
    name: string
    designation: string
    project: string
    noticePeriod: number
    status: string
    imageUrl: string
}
type SortableColumn = keyof Omit<Employee, 'id'>

export default function Component() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedProject, setSelectedProject] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState<SortableColumn>('name')
    const [sortDirection, setSortDirection] = useState('asc')

    const itemsPerPage = 10

    /**
     * @description Computes a list of unique project names from the employees array.
     * @returns {string[]} An array of project names including 'All' for filtering.
     */
    const projects = useMemo(() => {
        const projectSet = new Set(employees.map((emp) => emp.project))
        return ['All', ...Array.from(projectSet)]
    }, [])

    /**
     * @description Filters employees based on the selected project and search term, and sorts the result.
     * @returns {Employee[]} A filtered and sorted array of employees.
     */
    const filteredEmployees = employees
        .filter(
            (emp) =>
                (selectedProject === 'All' ||
                    emp.project === selectedProject) &&
                (emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    emp.designation
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
        )
        .sort((a, b) => {
            const aValue = a[sortColumn] ?? ''
            const bValue = b[sortColumn] ?? ''
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
            return 0
        })

    /**
     * @description Calculates the total number of pages for pagination.
     * @returns {number} The total number of pages.
     */
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)

    /**
     * @description Extracts a slice of the filtered employees for the current page.
     * @returns {Employee[]} The paginated employees for the current page.
     */
    const paginatedEmployees = filteredEmployees.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    /**
     * @description Handles sorting of employees by a specified column.
     * @param {SortableColumn} column - The column by which to sort employees.
     */
    const handleSort = (column: SortableColumn) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    /**
     * @description Renders a sorting icon indicating the current sort direction for a column.
     * @param {SortableColumn} column - The column for which to display the sort icon.
     * @returns {JSX.Element | null} The sorting icon component or null if the column is not sorted.
     */
    const SortIcon = ({
        column,
    }: {
        column: SortableColumn
    }): JSX.Element | null => {
        if (column !== sortColumn) return null
        return sortDirection === 'asc' ? (
            <ChevronUp className="inline-block ml-1" size={16} />
        ) : (
            <ChevronDown className="inline-block ml-1" size={16} />
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Employee Resignation List
                        </h1>
                        <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
                            Total: {filteredEmployees.length}
                        </span>
                    </div>

                    {/* Enhanced Search and Filter Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative group">
                            <Input
                                type="text"
                                placeholder="Search by name or designation..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-11 w-full bg-gray-50 border-gray-300 hover:border-gray-400 focus:border-blue-500 transition-all duration-200"
                            />
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600"
                                size={20}
                            />
                        </div>
                        <Select
                            value={selectedProject}
                            onValueChange={setSelectedProject}
                        >
                            <SelectTrigger className="h-11 bg-gray-50 border-gray-300 hover:border-gray-400 focus:border-blue-500">
                                <SelectValue placeholder="Filter by project" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px] overflow-y-auto">
                                {projects.map((project) => (
                                    <SelectItem
                                        key={project}
                                        value={project}
                                        className="hover:bg-blue-50 cursor-pointer"
                                    >
                                        {project}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Enhanced Table Section */}
                {filteredEmployees.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <Search className="w-12 h-12 text-gray-400" />
                            <p className="text-xl text-gray-600 font-medium">
                                No employees found
                            </p>
                            <p className="text-gray-500">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                                        {/* Header cells with improved sorting UI */}
                                        <TableHead className="font-semibold text-gray-600 py-4">
                                            Employee ID
                                        </TableHead>
                                        {[
                                            { key: 'name', label: 'Name' },
                                            {
                                                key: 'designation',
                                                label: 'Designation',
                                            },
                                            {
                                                key: 'project',
                                                label: 'Project',
                                            },
                                            {
                                                key: 'noticePeriod',
                                                label: 'Notice Period',
                                            },
                                        ].map(({ key, label }) => (
                                            <TableHead
                                                key={key}
                                                onClick={() =>
                                                    handleSort(
                                                        key as SortableColumn
                                                    )
                                                }
                                                className="font-semibold text-gray-600 py-4 cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-2">
                                                    {label}
                                                    <span
                                                        className={`transition-opacity duration-200 ${
                                                            sortColumn === key
                                                                ? 'opacity-100'
                                                                : 'opacity-0 group-hover:opacity-50'
                                                        }`}
                                                    >
                                                        <SortIcon
                                                            column={
                                                                key as SortableColumn
                                                            }
                                                        />
                                                    </span>
                                                </div>
                                            </TableHead>
                                        ))}
                                        <TableHead className="font-semibold text-gray-600 py-4">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedEmployees.map((emp) => (
                                        <TableRow
                                            key={emp.id}
                                            className="hover:bg-blue-50/50 transition-colors duration-150"
                                        >
                                            <TableCell className="font-medium text-gray-600">
                                                {emp.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    {emp.imageUrl ? (
                                                        <img
                                                            src={emp.imageUrl}
                                                            alt={emp.name}
                                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                                                        />
                                                    ) : (
                                                        <div
                                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-white ${
                                                                appConstants
                                                                    .bgColors[
                                                                    emp.name
                                                                        .length %
                                                                        appConstants
                                                                            .bgColors
                                                                            .length
                                                                ]
                                                            }`}
                                                        >
                                                            {getInitial(
                                                                emp.name
                                                            )}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-gray-700">
                                                            {emp.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {emp.designation}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-gray-600">
                                                {emp.designation}
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                                                    {emp.project}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div
                                                    className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1
                                                    ${
                                                        emp.noticePeriod < 10
                                                            ? 'bg-red-50 text-red-600'
                                                            : emp.noticePeriod <=
                                                                30
                                                              ? 'bg-orange-50 text-orange-600'
                                                              : 'bg-green-50 text-green-600'
                                                    }`}
                                                >
                                                    {emp.noticePeriod} days
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {emp.status === 'pending' ? (
                                                    <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors duration-200">
                                                        <a href={`/dashboard`}>
                                                            <Eye className="w-5 h-5" />
                                                        </a>
                                                    </button>
                                                ) : (
                                                    <button className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors duration-200">
                                                        <a
                                                            href={`/hr/offboarding`}
                                                        >
                                                            <CalendarPlus className="w-5 h-5" />
                                                        </a>
                                                    </button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Enhanced Pagination */}
                        <div className="border-t border-gray-100 px-4 py-4 sm:px-6">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.max(prev - 1, 1)
                                                )
                                            }
                                            className={`${
                                                currentPage === 1
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-700 hover:text-blue-600'
                                            } transition-colors duration-200`}
                                            aria-disabled={currentPage === 1}
                                        />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                onClick={() =>
                                                    setCurrentPage(i + 1)
                                                }
                                                isActive={currentPage === i + 1}
                                                className={`${
                                                    currentPage === i + 1
                                                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                                                        : 'hover:bg-gray-50 text-gray-600'
                                                } transition-colors duration-200`}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() =>
                                                setCurrentPage((prev) =>
                                                    Math.min(
                                                        prev + 1,
                                                        totalPages
                                                    )
                                                )
                                            }
                                            className={`${
                                                currentPage === totalPages
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-700 hover:text-blue-600'
                                            } transition-colors duration-200`}
                                            aria-disabled={
                                                currentPage === totalPages
                                            }
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
