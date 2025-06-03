"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Lock, CheckCircle } from "lucide-react"
import Image from "next/image"
import { motion } from 'framer-motion'

interface MapScreenProps {
  unlockedStops: number[]
  onSelectStop: (stopIndex: number) => void
}

export default function MapScreen({ unlockedStops, onSelectStop }: MapScreenProps) {
  const stops = [
    {
      name: "Parada 1",
      position:
        "top-[15%] left-[42%] sm:top-[20%] sm:left-[30%] md:top-[22%] md:left-[28%]",
    },
    {
      name: "Parada 2",
      position:
        "bottom-[15%] left-[32%] sm:bottom-[15%] sm:left-[38%] md:bottom-[18%] md:left-[35%]",
    },
    {
      name: "Parada 3",
      position:
        "bottom-[30%] left-[58%] sm:bottom-1/3 sm:left-[60%] md:bottom-[35%] md:left-[62%]",
    },
    {
      name: "Parada 4",
      position:
        "top-[35%] left-[70%] sm:top-[33%] sm:left-[65%] md:top-[35%] md:left-[68%]",
    },
  ]




  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }
      }
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative h-full">
      <div className="flex flex-col items-center justify-center h-full w-full bg-[url('/mapBG.png')] bg-cover text-white p-6">
        {stops.map((stop, index) => {
          const isUnlocked = unlockedStops.includes(index)
          const isCompleted = index < Math.max(...unlockedStops)

          return (
            <div key={index} className={`absolute ${stop.position} transform -translate-x-1/2 -translate-y-1/2`}>
              <Button
                onClick={() => isUnlocked && onSelectStop(index)}
                disabled={!isUnlocked}
                className={`w-80 flex flex-col items-center justify-center p-0 bg-transparent hover:bg-transparent border-0`}
              >

                <div className="relative w-[120px] sm:w-[150px] md:w-[200px] lg:w-[240px] aspect-square">
                  <Image
                    src={
                      isCompleted
                        ? `/parada${index + 1}_completed.svg`
                        : isUnlocked
                          ? `/parada${index + 1}.svg`
                          : `/parada${index + 1}_locked.svg`
                    }
                    alt={stop.name}

                    fill
                    className={`object-contain ${isUnlocked && !isCompleted ? "animate-pulseScale" : ""}`}
                  />
                </div>
              </Button>
            </div>
          )
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {unlockedStops.length === 1
            ? "Comece pela Parada 1"
            : unlockedStops.length === 4
              ? "Todas as paradas desbloqueadas!"
              : `${unlockedStops.length} de 4 paradas desbloqueadas`}
        </p>
      </div>
    </motion.div>
  )
}
