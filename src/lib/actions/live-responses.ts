"use server";

import { prisma } from "@/lib/prisma";

const createLiveResponse = async ({
  uniqueLink,
  text,
}: {
  uniqueLink: string;
  text: string;
}) => {
  return prisma.liveResponse.create({
    data: {
      uniqueLink,
      text,
    },
  });
};

const getLiveResponses = async () => {
  return prisma.liveResponse.findMany({});
};

const getLiveResponse = async ({ uniqueLink }: { uniqueLink: string }) => {
  return prisma.liveResponse.findUnique({
    where: {
      uniqueLink,
    },
  });
};

const upsertReaction = async ({
  uniqueLink,
  emoji,
}: {
  uniqueLink: string;
  emoji: string;
}) => {
  return prisma.liveResponeEmoji.upsert({
    where: {
      liveResponseLink: uniqueLink,
      emoji,
    },
    create: {
      liveResponseLink: uniqueLink,
      emoji,
    },
    update: {
      liveResponseLink: uniqueLink,
      emoji,
    },
  });
};

const getReactions = async ({ uniqueLink }: { uniqueLink: string }) => {
  return prisma.liveResponeEmoji.groupBy({
    by: ["emoji"],
    where: {
      liveResponseLink: uniqueLink,
    },
    _count: {
      emoji: true,
    },
  });
};

export {
  createLiveResponse,
  getLiveResponses,
  getLiveResponse,
  upsertReaction,
  getReactions,
};
