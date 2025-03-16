"use server";

import { prisma } from "@/lib/prisma";

const createRegistration = async ({ id }: { id: string  }) => {
    const registration = await prisma.registrations.create({
      data: {
        studId: id,
      },
    });
    return registration;
}

const getRaffleEntries = async () => {
  return await prisma.registrations.findMany({
    where: { win: false },
    include: {
      stud: true,
    },
  })
}

const setWin = async (id: number) => {
  return await prisma.registrations.update({
    where: { id },
    data: { win: true },
  })
}

const getRegistrations = async () => {
  return await prisma.registrations.findMany({
    include: {
      stud: true,
    },
  })
}

export {
  createRegistration,
  getRaffleEntries,
  setWin,
  getRegistrations
}