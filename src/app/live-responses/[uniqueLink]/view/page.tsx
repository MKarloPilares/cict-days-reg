"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import type { LiveResponse } from "@prisma/client";
import { getLiveResponse } from "@/lib/actions/live-responses";
import { motion, AnimatePresence } from "framer-motion";

type EmojiAnimation = {
  id: string;
  emoji: string;
  x: number;
  y: number;
  duration: number;
  damping: number;
  scale: number;
};

export default function LiveResponseViewPage() {
  const params = useParams();
  const [data, setData] = useState<LiveResponse>();
  const [emojiAnimations, setEmojiAnimations] = useState<EmojiAnimation[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);
      const randomX = Math.random() * window.innerWidth - 800;
      const randomY = window.innerHeight - 500;

      const randomEmoji = {
        id: `emoji-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        emoji: message.emoji,
        x: randomX,
        y: randomY,
        duration: 2 + Math.random() * 2,
        damping: 8 + Math.random() * 5,
        scale: 1 + Math.random() * 1.2,
      };

      setEmojiAnimations(prev => [...prev, randomEmoji]);

      setTimeout(() => {
        setEmojiAnimations(prev => prev.filter(e => e.id !== randomEmoji.id));
      }, 3000);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }, []);

  useEffect(() => {
    getLiveResponse({ uniqueLink: params.uniqueLink as string }).then(res => {
      if (res) {
        setData(res);
      }
    });

    const eventSource = new EventSource(
      `/api/live-responses/${params.uniqueLink}`,
    );
    eventSourceRef.current = eventSource;
    eventSource.onmessage = handleMessage;

    eventSource.onerror = error => {
      console.error("EventSource error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [params.uniqueLink, handleMessage]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white p-4">
      <p className="z-10 min-h-[60vh] w-[80%] resize-none border-none p-4 font-mono text-6xl font-extrabold outline-none">
        {data?.text}
      </p>
      
      <AnimatePresence>
        {emojiAnimations.map(emojiAnim => (
          <motion.div
            key={emojiAnim.id}
            className="pointer-events-none absolute z-10 text-5xl"
            initial={{
              x: emojiAnim.x,
              y: emojiAnim.y,
              scale: 0.5,
              opacity: 0,
            }}
            animate={{
              y: emojiAnim.y - 250 - Math.random() * 50,
              scale: emojiAnim.scale,
              opacity: 1,
            }}
            exit={{
              y: emojiAnim.y - 350 - Math.random() * 50,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              damping: emojiAnim.damping,
              duration: emojiAnim.duration,
            }}
          >
            {emojiAnim.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
