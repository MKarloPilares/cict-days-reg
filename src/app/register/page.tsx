"use client";

import DatePicker from "react-datepicker";
import Image from "next/image";
import type React from "react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, User, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Students } from "@prisma/client";
import { getStudent, createStudent } from "@/lib/actions/students";
import { createRegistration } from "@/lib/actions/registration";
import { useRouter } from "next/navigation";

import "react-datepicker/dist/react-datepicker.css";

export default function Register() {
  const [studNum, setStudNum] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [student, setStudent] = useState<Students | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleCollegeRegister = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitting(true);
    const studId = e.target.value.replace(/^0+/, '')
    if (registrationType === "college") {
          try {
            if (studId.length === 7) {
                setStudent(await getStudent({ id: studId }));
                await createRegistration({ id: studId });
                e.target.value="";
              }
            } catch (error) {
              console.log(error);
              alert("This student is already registered");
              setIsSubmitting(false);
            }
    }
  };

  const handleSHSRegister = async () => {
    setIsSubmitting(true);{
      if (birthday) {
        try {
          await createStudent({
            id: studNum,
            studLevel: registrationType,
            lastName: lastName,
            firstName: firstName,
            middleName: middleName,
            prefCourse: course,
            mobile: mobile,
            birthday: birthday, // Make sure birthday is never null here
          });
          await createRegistration({ id: studNum });
          router.push("/done");
        } catch (error) {
          console.log(error);
          alert("This student is already registered");
          setIsSubmitting(false);
        }
      }
    }
  };

  return (
    <div className="min-h-svh w-full bg-gray-50">
      <div className="mx-auto flex justify-center px-4 py-3 md:justify-center">
        <Image
          src="/logo.png"
          alt="Ub Logo"
          width={200}
          height={100}
          className="mt-3"
        />
      </div>

      <div className="container mx-auto max-w-md px-4 py-6 md:py-10">
        <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 space-y-2">
            <h1 className="text-center text-2xl font-bold md:text-left">
              Student Registration
            </h1>
            <p className="text-muted-foreground text-center text-sm md:text-left">
              Please fill out the form below to register
            </p>
          </div>

          <div className="space-y-3">
            <Label className="text-base">I am registering as:</Label>
            <RadioGroup
              value={registrationType}
              onValueChange={setRegistrationType}
              className="grid grid-cols-1 gap-2"
            >
              <Label
                htmlFor="college"
                className={cn(
                  "flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors",
                  registrationType === "college"
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50",
                )}
              >
                <RadioGroupItem value="college" id="college" />
                <div className="flex-1">
                  <div className="font-medium">College Student</div>
                  <div className="text-muted-foreground text-sm">
                    CICT Students
                  </div>
                </div>
              </Label>

              <Label
                htmlFor="senior-high"
                className={cn(
                  "flex cursor-pointer items-center space-x-3 rounded-lg border p-4 transition-colors",
                  registrationType === "senior-high"
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50",
                )}
              >
                <RadioGroupItem value="senior-high" id="senior-high" />
                <div className="flex-1">
                  <div className="font-medium">Senior High School Student</div>
                  <div className="text-muted-foreground text-sm">
                    Grades 11-12 programs
                  </div>
                </div>
              </Label>
            </RadioGroup>
          </div>

          {registrationType === "college" && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="student-number" className="text-base">
                  Student Number
                </Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-3 left-3 h-5 w-5" />
                  <Input
                    id="student-number"
                    placeholder="Enter your student number"
                    defaultValue={studNum}
                    className="h-12 pl-10"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCollegeRegister(e)}
                    required
                  />
                </div>
                <p className="text-muted-foreground text-xs">
                  Your student number can be found on your ID card
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-base">
                  First Name
                </Label>
                <Input
                  id="first-name"
                  placeholder="Enter your first name"
                  defaultValue={student?.firstName}
                  className="h-12"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middle-name" className="text-base">
                  Middle Name
                </Label>
                <Input
                  id="middle-name"
                  placeholder="Enter your middle name"
                  defaultValue={student?.middleName}
                  className="h-12"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-base">
                  Last Name
                </Label>
                <Input
                  id="last-name"
                  placeholder="Enter your last name"
                  defaultValue={student?.lastName}
                  className="h-12"
                  disabled
                />
              </div>
            </div>
          )}

          {registrationType === "senior-high" && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="student-number" className="text-base">
                  Student Number
                </Label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-3 left-3 h-5 w-5" />
                  <Input
                    id="student-number"
                    placeholder="Enter your student number"
                    className="h-12 pl-10"
                    onChange={e => setStudNum(e.target.value)}
                    required
                  />
                </div>
                <p className="text-muted-foreground text-xs">
                  Your student number can be found on your ID card
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-base">
                  First Name
                </Label>
                <Input
                  id="first-name"
                  placeholder="Enter your first name"
                  onChange={e => setFirstName(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="middle-name" className="text-base">
                  Middle Name
                </Label>
                <Input
                  id="middle-name"
                  placeholder="Enter your middle name"
                  onChange={e => setMiddleName(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-base">
                  Last Name
                </Label>
                <Input
                  id="last-name"
                  placeholder="Enter your last name"
                  onChange={e => setLastName(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stand" className="text-base">
                  Preferred Program(Course)
                </Label>
                <Input
                  id="strand"
                  placeholder="Enter your preferred program"
                  onChange={e => setCourse(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-base">
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  placeholder="Enter your mobile number"
                  onChange={e => setMobile(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthday" className="text-base">
                  Birthday
                </Label>
                <div className="relative">
                  <Calendar className="text-muted-foreground pointer-events-none absolute top-3 left-3 z-10 h-5 w-5" />
                  <DatePicker
                    id="birthday"
                    selected={birthday}
                    onChange={(date: Date | null) => setBirthday(date)}
                    placeholderText="yyyy-MM-dd"
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring h-12 w-full rounded-md border px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    dateFormat="yyyy-MM-dd"
                    wrapperClassName="w-full"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={50}
                    required
                  />
                </div>
                <p className="text-muted-foreground text-xs">
                  Follow the format: yyyy-MM-dd
                </p>
              </div>
            </div>
          )}

          <Button
            variant={"destructive"}
            className={`mt-4 flex h-12 w-full items-center justify-center gap-2 text-base
              ${registrationType === "senior-high" ? "" : "hidden"}`}
            onClick={handleSHSRegister}
            disabled={!registrationType || isSubmitting}
          >
            Register
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
