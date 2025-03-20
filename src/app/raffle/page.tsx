"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRaffleEntries, setWin } from "@/lib/actions/registration";

interface Entry {
  id: number;
  createdAt: Date;
  studId: string;
  win: boolean;
  stud: {
    id: string;
    studLevel: string;
    lastName: string;
    firstName: string;
    middleName: string;
    birthday: Date;
    createdAt: Date;
  };
}

export default function Raffle() {
  const [winner, setWinner] = useState<string | null>("N/A");
  const [isDrawing, setIsDrawing] = useState(false);
  const [winnerPicked, setWinnerPicked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const fetchedEntries = await getRaffleEntries();
      setEntries(fetchedEntries);

      const participantNames = fetchedEntries.map(
        entry =>
          entry.stud.firstName +
          " " +
          entry.stud.middleName +
          " " +
          entry.stud.lastName,
      );
      setParticipants(participantNames);
    };

    fetchParticipants();
  }, [showConfetti]);

  const drawWinner = () => {
    setIsDrawing(true);
    setWinner(null);
    setWinnerPicked(false);

    let counter = 0;
    const interval = setInterval(() => {
      setWinner(participants[counter % participants.length]);
      counter++;

      if (counter > 20) {
        clearInterval(interval);
        setIsDrawing(false);

        const randomWinnerName =
          participants[Math.floor(Math.random() * participants.length)];

        const winnerEntry = entries.find(entry => {
          const participantFullName = `${entry.stud.firstName} ${entry.stud.middleName} ${entry.stud.lastName}`;
          return participantFullName === randomWinnerName;
        });

        if (winnerEntry) {
          setWinner(randomWinnerName);
          setWin(winnerEntry.id);
          setShowConfetti(true);
          setWinnerPicked(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
      }
    }, 100);
  };

  return (
    <div className="flex min-h-svh w-full flex-col items-center justify-center bg-[url('/blank-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <h1 className="text-7xl mb-15 font-bold text-white">CICT IT CONGRESS 2025</h1>
      {showConfetti && <ConfettiEffect />}

      <Card className="w-[30rem] border-0 bg-white shadow-lg backdrop-blur-sm">
        <CardHeader className="pb-1 text-center">
          <CardTitle className="flex items-center justify-center gap-2 mb-5 text-3xl font-bold tracking-tight">
            <span className="text-2xl">🎉</span>
              Raffle
            <span className="text-2xl">🎉</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-2 pb-6">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
              </div>
              
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={winner || "empty"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                {winner ? (
                  <>
                    <div className="relative">
                      `&quot;`
                      <div className="bg-primary text-primary-foreground absolute -right-16 -bottom-5 rounded-full p-5 text-7xl">
                        🏆
                      </div>
                    </div>
                    <div className="text-center mt-2 w-full">
                      <h3 className={`text-4xl font-bold ${winnerPicked ? 'text-amber-500 animate-pulse' : ''}`}>{winner}</h3>
                      <div>
                        {winnerPicked ? (
                          <p className="text-muted-foreground text-3xl">Congratulations!</p>
                        ) : (
                          <p className="text-muted-foreground text-3xl"></p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-40 items-center justify-center">
                    <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            size="lg"
            className="w-full text-lg font-medium bg-[#8AAAE5] hover:bg-[#7792c4]"
            onClick={drawWinner}
            disabled={isDrawing}
          >
            {isDrawing ? "Drawing..." : "Draw Raffle"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function ConfettiEffect() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            top: "-10%",
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            backgroundColor: [
              "#FFD700",
              "#FF6347",
              "#4169E1",
              "#32CD32",
              "#FF69B4",
              "#9370DB",
            ][Math.floor(Math.random() * 6)],
            borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            rotate: `${Math.random() * 360}deg`,
          }}
          animate={{
            top: "100%",
            rotate: `${Math.random() * 360 + 360}deg`,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "linear",
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
}
