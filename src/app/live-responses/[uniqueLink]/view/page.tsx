"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

import { getLiveResponse, getReactions } from "@/lib/actions/live-responses";
import type { LiveResponse } from "@prisma/client";

type EmojiAnimation = {
  id: string;
  emoji: string;
  x: number;
  y: number;
  duration: number;
  damping: number;
  scale: number;
};

type EmojiCount = {
  emoji: string;
  count: number;
};  

export default function LiveResponseViewPage() {
  const params = useParams();
  const [data, setData] = useState<LiveResponse>();
  const [emojiAnimations, setEmojiAnimations] = useState<EmojiAnimation[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);
  const userEmojiTimestamps = useRef<Map<string, number[]>>(new Map());
  const [emojiCounts, setEmojiCounts] = useState<EmojiCount[]>([]);

  const updateBoard = useCallback(async () => {
    const res = await getReactions({ uniqueLink: params.uniqueLink as string });
    setEmojiCounts(res.map(({ emoji, count }) => ({
      emoji,
      count,
    })));
  }, [params.uniqueLink]);  
    
  useEffect(() => {
    updateBoard()
  }, [updateBoard]);

  const handleMessage = useCallback(async (event: MessageEvent) => {
    try {
      const { emoji, userId } = JSON.parse(event.data);
      
      const now = Date.now();
      const userTimestamps = userEmojiTimestamps.current.get(userId) || [];
      const recentTimestamps = userTimestamps.filter(ts => now - ts < 3000);
      
      if (recentTimestamps.length >= 3)
        return;

      updateBoard();
      userEmojiTimestamps.current.set(userId, [...recentTimestamps, now]);

      const randomX = Math.random() * window.innerWidth - 800;
      const randomY = window.innerHeight - 500;

      const randomEmoji = {
        id: `emoji-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        emoji: emoji,
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
  }, [updateBoard]);

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
      
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed right-4 top-4 z-20 flex flex-col gap-4 rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur-lg"
      >
        <h3 className="mb-2 text-xl font-bold text-gray-700">Reaction Stats</h3>
        <AnimatePresence>
          {emojiCounts
            .sort((a, b) => b.count - a.count)
            .map(({ emoji, count }) => {
              const maxCount = Math.max(...emojiCounts.map(e => e.count), 1);
              const barWidth = (count / maxCount) * 100;

              return (
                <motion.div
                  key={emoji}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl">{emoji}</span>
                  <div className="relative flex-1">
                    <motion.div
                      className="h-6 bg-gray-200 rounded-full overflow-hidden"
                      style={{ width: '100%' }}
                    >
                      <motion.div
                        className="h-full bg-blue-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.5, type: 'spring' }}
                      />
                    </motion.div>
                  </div>
                  <motion.span
                    key={count}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-lg font-semibold text-gray-600 min-w-[40px] text-right"
                  >
                    {count}
                  </motion.span>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </motion.div>
      
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
