"use client"

import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowUpDown, Download, UserCheck } from "lucide-react"

interface Attendee {
  id: number
  name: string
  studentId: string
  course: string
  yearLevel: string
  educationalLevel: string
}

export default function AttendanceTable() {
  const initialAttendees: Attendee[] = [
    {
      id: 1,
      name: "Joshua Datinguinoo",
      studentId: "2202901",
      course: "BSIT",
      yearLevel: "4th year",
      educationalLevel: "College",
    },
    {
      id: 2,
      name: "Kent Kalaw",
      studentId: "2202901",
      course: "BSIT",
      yearLevel: "4th year",
      educationalLevel: "College",
    },
    {
      id: 3,
      name: "Jed Balita",
      studentId: "2202901",
      course: "BSIT",
      yearLevel: "4th year",
      educationalLevel: "College",
    },
    {
      id: 4,
      name: "Ara Panahon",
      studentId: "2202901",
      course: "BSIT",
      yearLevel: "4th year",
      educationalLevel: "College",
    },
    {
      id: 5,
      name: "Karlo Pilares",
      studentId: "2202901",
      course: "BSIT",
      yearLevel: "4th year",
      educationalLevel: "College",
    },
    {
      id: 6,
      name: "Precious De Castro",
      studentId: "2202901",
      course: "BSIT",
      yearLevel: "4th year",
      educationalLevel: "College",
    },
  ]

  const [attendees, setAttendees] = useState<Attendee[]>(initialAttendees)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof Attendee; direction: "ascending" | "descending" } | null>(
    null,
  )

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value === "") {
      setAttendees(initialAttendees)
    } else {
      const filteredResults = initialAttendees.filter(
        (attendee) =>
          attendee.name.toLowerCase().includes(value.toLowerCase()) ||
          attendee.studentId.includes(value) ||
          attendee.course.toLowerCase().includes(value.toLowerCase()),
      )
      setAttendees(filteredResults)
    }
  }

  // Sorting functionality
  const requestSort = (key: keyof Attendee) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })

    const sortedData = [...attendees].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setAttendees(sortedData)
  }

  // Get sort direction indicator
  const getSortDirectionIndicator = (key: keyof Attendee) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓"
  }

  return (
    <div className="w-full">
      <div>
      <div className="flex justify-center items-center gap-2">
            <UserCheck className="h-7 w-7 text-primary" />
            <div className="text-2xl font-bold">CICT IT Congress Attendance</div>
          </div>
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search attendees..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-muted/50 bg-muted/20">
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead className="min-w-[180px]">
                  <Button
                    variant="ghost"
                    className="p-0 font-semibold hover:bg-transparent"
                    onClick={() => requestSort("name")}
                  >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    {getSortDirectionIndicator("name")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="p-0 font-semibold hover:bg-transparent"
                    onClick={() => requestSort("studentId")}
                  >
                    Student ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    {getSortDirectionIndicator("studentId")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="p-0 font-semibold hover:bg-transparent"
                  >
                    Course
                  </Button>
                </TableHead>
                <TableHead>Year Level</TableHead>
                <TableHead>Educational Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees.length > 0 ? (
                attendees.map((attendee, index) => (
                  <TableRow key={attendee.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{attendee.name}</TableCell>
                    <TableCell>{attendee.studentId}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10">
                        {attendee.course}
                      </Badge>
                    </TableCell>
                    <TableCell>{attendee.yearLevel}</TableCell>
                    <TableCell>{attendee.educationalLevel}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="py-4 px-6 text-sm text-muted-foreground border-t">
          Showing {attendees.length} of {initialAttendees.length} attendees
        </div>
      </div>
    </div>
  )
}

