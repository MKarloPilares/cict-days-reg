"use client";

import { useParams } from "next/navigation";

import { emojis } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function LiveResponsePage() {
  const params = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="flex gap-2">
        {emojis.map((emoji) => {
          return (
            <Button
              variant="outline"
              key={emoji}
              className="h-28 rounded-full p-4 text-6xl font-mono font-extrabold outline-8"
              onClick={async () => {
                await fetch(`/api/live-responses/${params.uniqueLink}`, {
                  method: "POST",
                  body: JSON.stringify({ emoji }),
                });
              }}
            >
              {emoji}
            </Button>
          )
        })}
      </div>
    </div>
  );
}