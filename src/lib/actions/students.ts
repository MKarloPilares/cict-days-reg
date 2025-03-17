"use server";

import { prisma } from "@/lib/prisma";

const getStudent = async ({ id }: { id: string }) => {
  return await prisma.students.findUnique({
    where: { id }, // Ensure 'studId' is the unique field
  });
};

const createStudent = async ({
  id,
  studLevel,
  lastName,
  firstName,
  middleName,
  prefCourse,
  mobile,
  birthday,
}: {
  id: string;
  studLevel: string;
  lastName: string;
  firstName: string;
  middleName: string;
  prefCourse: string;
  mobile: string;
  birthday: Date;
}) => {
  const student = await prisma.students.create({
    data: {
      id,
      studLevel,
      lastName,
      firstName,
      middleName,
      birthday,
      prefCourse,
      mobile,
    },
  });

  return student;
};

export { getStudent, createStudent };
