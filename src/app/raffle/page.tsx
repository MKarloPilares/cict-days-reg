"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SnowflakeIcon as Confetti } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRaffleEntries, setWin } from "@/lib/actions/registration"
import { useRouter } from "next/navigation"

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
  const [winner, setWinner] = useState<string | null>("N/A")
  const [isDrawing, setIsDrawing] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [entries, setEntries] = useState<Entry[]>([])
  const [participants, setParticipants] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchParticipants = async () => {
      const fetchedEntries = await getRaffleEntries()
      setEntries(fetchedEntries)

      const participantNames = fetchedEntries.map((entry) => 
        entry.stud.firstName + " " + entry.stud.middleName + " " + entry.stud.lastName
      )
      setParticipants(participantNames)
    }

    fetchParticipants()
  }, [showConfetti]) 

  const drawWinner = () => {
    setIsDrawing(true)
    setWinner(null)
  
    let counter = 0
    const interval = setInterval(() => {
      setWinner(participants[counter % participants.length])
      counter++
  
      if (counter > 20) {
        clearInterval(interval)
        setIsDrawing(false)
  
        const randomWinnerName = participants[Math.floor(Math.random() * participants.length)]
  
        const winnerEntry = entries.find(entry => {
          const participantFullName = `${entry.stud.firstName} ${entry.stud.middleName} ${entry.stud.lastName}`
          return participantFullName === randomWinnerName
        })
  
        if (winnerEntry) {
          setWinner(randomWinnerName)
          setWin(winnerEntry.id)
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 5000)
        }
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      {showConfetti && <ConfettiEffect />}

      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
              <Confetti className="w-4 h-4 mr-1" />
              Raffle Event
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
            <span className="text-2xl">🎉</span>
            Raffle Draw
            <span className="text-2xl">🎉</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4 pb-6">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Current Winner</span>
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
                      <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                        🏆
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">{winner}</h3>
                      <p className="text-muted-foreground">Congratulations!</p>
                    </div>
                  </>
                ) : (
                  <div className="h-40 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full text-lg font-medium" onClick={drawWinner} disabled={isDrawing}>
            {isDrawing ? "Drawing..." : "Draw Raffle"}
          </Button>
        </CardFooter>
        <CardFooter>
          <Button size="lg" className="w-full text-lg font-medium" onClick={() => router.push("/attendance")} disabled={isDrawing}>
            View Attendees
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function ConfettiEffect() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            top: "-10%",
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            backgroundColor: ["#FFD700", "#FF6347", "#4169E1", "#32CD32", "#FF69B4", "#9370DB"][
              Math.floor(Math.random() * 6)
            ],
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
  )
}

