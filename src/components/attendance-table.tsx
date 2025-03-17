"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown, UserCheck } from "lucide-react";
import { getRegistrations } from "@/lib/actions/registration";
import { useRouter } from "next/navigation";

interface Attendee {
  id: string;
  name: string;
  studentLevel: string;
  prefCourse: string;
  mobile: string;
  win: boolean;
}

export default function AttendanceTable() {
  const [initialAttendees, setInitialAttendees] = useState<Attendee[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [showWinners, setShowWinners] = useState(false);
  const [showsNonWinners, setShowNonWinners] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Attendee;
    direction: "ascending" | "descending";
  } | null>(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const fetchedRegistrations = await getRegistrations();

      const mappedAttendees = fetchedRegistrations.map(reg => ({
        id: reg.stud.id,
        name:
          reg.stud.firstName +
          " " +
          reg.stud.middleName +
          " " +
          reg.stud.lastName,
        studentLevel: reg.stud.studLevel,
        prefCourse: reg.stud.prefCourse,
        mobile: reg.stud.mobile,
        win: reg.win,
      }));

      setInitialAttendees(mappedAttendees);
      setAttendees(mappedAttendees);
    };
    fetchRegistrations();
  }, []);

  // Search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase(); // Ensure case-insensitive search
    setSearchTerm(value);

    if (value === "") {
      setAttendees(initialAttendees); // Reset to initial attendees when search term is cleared
    } else {
      const filteredResults = initialAttendees.filter(
        attendee =>
          attendee.name.toLowerCase().includes(value) || // Ensure case-insensitive comparison
          attendee.id.toLowerCase().includes(value) ||
          attendee.studentLevel.toLowerCase().includes(value) || 
          attendee.prefCourse.toLowerCase().includes(value) ||
          attendee.mobile.toLowerCase().includes(value),
      );
      setAttendees(filteredResults);
    }
  };

  // Sorting functionality
  const requestSort = (key: keyof Attendee) => {
    let direction: "ascending" | "descending" = "ascending";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedData = [...attendees].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setAttendees(sortedData);
  };

  // Get sort direction indicator
  const getSortDirectionIndicator = (key: keyof Attendee) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  const handleWinnersClick = () => {
    if (showWinners && showsNonWinners) {
      setShowNonWinners(!showsNonWinners);
      setShowWinners(!showWinners);
      setAttendees(initialAttendees);
    } else if (!showWinners && !showsNonWinners) {
      const winners = initialAttendees.filter(attendee => attendee.win);
      setAttendees(winners);
      setShowNonWinners(!showsNonWinners);
    } else if (!showWinners && showsNonWinners) {
      const winners = initialAttendees.filter(attendee => !attendee.win);
      setAttendees(winners);
      setShowWinners(!showWinners);
    }
  };

  return (
    <div className="w-full">
      <div>
        <div className="flex items-center justify-center gap-2">
          <UserCheck className="text-primary h-7 w-7" />
          <div className="text-2xl font-bold">CICT IT Congress Attendance</div>
        </div>
        <div className="flex flex-col justify-end gap-4 md:flex-row md:items-center">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search attendees..."
                className="w-full pl-8 sm:w-[250px]"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={handleWinnersClick}
            >
              {showWinners
                ? "Non-Winners"
                : showsNonWinners
                  ? "Winners"
                  : "All"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => router.push("/raffle")}
            >
              Back To Raffle
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
                    onClick={() => requestSort("id")}
                  >
                    Student ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                    {getSortDirectionIndicator("id")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    className="p-0 font-semibold hover:bg-transparent"
                  >
                    Level
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
                <TableHead>
                  <Button
                    variant="ghost"
                    className="p-0 font-semibold hover:bg-transparent"
                  >
                    Mobile
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees.length > 0 ? (
                attendees.map((attendee, index) => (
                  <TableRow key={attendee.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {attendee.name}
                    </TableCell>
                    <TableCell>{attendee.id}</TableCell>
                    <TableCell>{attendee.studentLevel}</TableCell>
                    <TableCell>{attendee.prefCourse}</TableCell>
                    <TableCell>{attendee.mobile}</TableCell>
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
        <div className="text-muted-foreground border-t px-6 py-4 text-sm">
          Showing {attendees.length} of {initialAttendees.length} attendees
        </div>
      </div>
    </div>
  );
}
