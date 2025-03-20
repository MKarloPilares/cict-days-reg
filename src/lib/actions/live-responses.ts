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
  userId,
  emoji,
}: {
  uniqueLink: string;
  userId: string;
  emoji: string;
}) => {
  return prisma.liveResponeEmoji.upsert({
    where: {
      userId_liveResponseLink: {
        userId,
        liveResponseLink: uniqueLink,
      },
    },
    create: {
      liveResponseLink: uniqueLink,
      userId,
      emoji,
    },
    update: {
      liveResponseLink: uniqueLink,
      emoji,
    },
  });
};

const getReactions = async ({ uniqueLink }: { uniqueLink: string }) => {
  return prisma.liveResponeEmoji
    .findMany({
      where: {
        liveResponseLink: uniqueLink,
      },
      select: {
        emoji: true,
      },
    })
    .then(reactions => {
      const reactionCounts = reactions.reduce(
        (acc, { emoji }) => {
          acc[emoji] = (acc[emoji] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );
      return Object.entries(reactionCounts).map(([emoji, count]) => ({
        emoji,
        count,
      }));
    });
};

export {
  createLiveResponse,
  getLiveResponses,
  getLiveResponse,
  upsertReaction,
  getReactions,
};
