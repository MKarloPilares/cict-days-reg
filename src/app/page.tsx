"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Brain,
  Cpu,
  Layers,
  Network,
  Zap,
  ChevronRight,
} from "lucide-react";

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="mb-8 flex flex-col items-center md:mb-16">
          <div className="relative mb-3">
            <Image
              src="/logo.png"
              alt="University of Batangas Logo"
              width={180}
              height={180}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="grid items-center gap-5 md:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold md:text-4xl">Welcome to</h2>
              <h1 className="bg-gradient-to-r from-[#8B1A1A] to-[#D93636] bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                IT CONGRESS 2025
              </h1>
              <p className="mt-4 text-xl text-gray-700">
                Future Proofing IT: Shaping IT Leaders for the Future
              </p>
            </div>

            <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Event Details</h3>

              <div className="flex items-start gap-3">
                <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-[#8B1A1A]" />
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-gray-600">March 21, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-[#8B1A1A]" />
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-gray-600">8:00 AM - 12:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-[#8B1A1A]" />
                <div>
                  <p className="font-medium">Venue</p>
                  <p className="text-gray-600">
                    University of Batangas Main Campus
                  </p>
                  <p className="text-gray-600">Hilltop Rd., Batangas City</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[30rem] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg md:h-[500px]">
            <div className="absolute inset-0 flex justify-center mt-4">
              <div className="relative h-64 w-64">
                <motion.div
                  className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#8B1A1A] p-6 text-white shadow-lg"
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: [0.8, 1, 0.8],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Brain size={48} />
                </motion.div>

                {[Cpu, Network, Layers, Zap].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 rounded-full border border-gray-200 bg-white p-3 shadow-md"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      x: Math.cos(index * (Math.PI / 2)) * 100,
                      y: Math.sin(index * (Math.PI / 2)) * 100,
                      scale: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                  >
                    <Icon size={24} className="text-[#8B1A1A]" />
                  </motion.div>
                ))}

                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 200 200"
                >
                  <motion.path
                    d="M100,100 L100,100"
                    stroke="#8B1A1A"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                    animate={{
                      d: [
                        "M100,100 L100,0 M100,100 L200,100 M100,100 L100,200 M100,100 L0,100",
                        "M100,100 L170,30 M100,100 L170,170 M100,100 L30,170 M100,100 L30,30",
                        "M100,100 L100,0 M100,100 L200,100 M100,100 L100,200 M100,100 L0,100",
                      ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </svg>

                {[0, 1, 2].map(index => (
                  <motion.div
                    key={`pulse-${index}`}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8B1A1A]"
                    initial={{
                      width: 50,
                      height: 50,
                      opacity: 0.8,
                    }}
                    animate={{
                      width: [50, 200],
                      height: [50, 200],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 1,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-white via-white/80 to-transparent p-6">
              <h3 className="text-xl font-bold text-[#8B1A1A]">
                Explore the Future of Technology
              </h3>
              <p className="text-gray-700">
              Join us as we hear from experts and industry leaders about the latest trends and 
              opportunities that students can engage with to shape their future careers!
              </p>
            </div>
          </div>
        </div>
        <Button
          className="mt-4 w-full rounded-full bg-[#8B1A1A] py-6 text-lg text-white hover:bg-[#6B1414] md:w-auto"
          onClick={() => router.push("/register")}
        >
          Register Now
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
