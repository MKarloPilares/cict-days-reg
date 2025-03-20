"use client";

import { randomBytes } from "crypto";
import { useParams } from "next/navigation";

import { emojis } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { upsertReaction } from "@/lib/actions/live-responses";

export default function LiveResponsePage() {
  const params = useParams();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {emojis.map(emoji => {
          return (
            <Button
              variant="outline"
              key={emoji}
              className="h-28 rounded-full p-4 font-mono text-6xl font-extrabold outline-8"
              onClick={async () => {
                let userId = localStorage.getItem("userId");

                if (!userId) {
                  userId = randomBytes(16).toString("hex");
                  localStorage.setItem("userId", userId);
                }

                await upsertReaction({
                  uniqueLink: params.uniqueLink as string,
                  userId,
                  emoji,
                });

                await fetch(`/api/live-responses/${params.uniqueLink}`, {
                  method: "POST",
                  body: JSON.stringify({ emoji, userId }),
                });
              }}
            >
              {emoji}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
