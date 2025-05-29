"use client"

import Image from "next/image"
import { motion } from 'framer-motion'
import { useSimpleTypewriter } from "@/hooks/use-simple-typewriter"


interface OnboardingProps {
  onStart: () => void
}

export default function OnboardingScreen({ onStart }: OnboardingProps) {
  const message = "Oi minha gente! Bora simbora passear pelas minhas memórias e pela cidade do maior São João do mundo! Vamos lá!"
  const displayText = useSimpleTypewriter(message, 60)


  return (
    <>
      < motion.div
        initial={{ opacity: 0, scale: 0.95 }
        }
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-center h-full w-full bg-[url('/bgOnboard.png')] bg-cover bg-center text-white p-6 z-10"
      >

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-80 right-10 flex flex-col items-center"
          onClick={onStart}
        >
          <div className="relative w-[800px] h-[800px]">
            <Image
              src="/images/baloon.svg"
              alt="Balão"
              fill
              className="object-contain"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-56 left-16 right-10 text-[38px] font-heading z-10"
            >
              {displayText}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
