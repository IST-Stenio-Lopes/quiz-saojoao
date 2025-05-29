"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useFullscreen } from "@/hooks/use-fullscrenn"
import { motion } from 'framer-motion'


interface StartScreenProps {
  onStart: () => void
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const { enterFullscreen } = useFullscreen()


  useEffect(() => {
    const attemptFullscreen = async () => {
      try {

        const userInteractionHandler = () => {
          enterFullscreen()
          document.removeEventListener("click", userInteractionHandler)
          document.removeEventListener("keydown", userInteractionHandler)
          document.removeEventListener("touchstart", userInteractionHandler)
        }

        document.addEventListener("click", userInteractionHandler)
        document.addEventListener("keydown", userInteractionHandler)
        document.addEventListener("touchstart", userInteractionHandler)

        return () => {
          document.removeEventListener("click", userInteractionHandler)
          document.removeEventListener("keydown", userInteractionHandler)
          document.removeEventListener("touchstart", userInteractionHandler)
        }
      } catch (error) {
        console.error("Erro ao tentar entrar em fullscreen:", error)
      }
    }

    attemptFullscreen()
  }, [enterFullscreen])

  const handleStartClick = () => {
    enterFullscreen()
    onStart()
  }

  return (
    <>
      < motion.div
        initial={{ opacity: 0, scale: 0.95 }
        }
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col items-center justify-center h-full w-full bg-[url('/bg.png')] bg-cover bg-center text-white p-6 z-10"
      >

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className=" mb-8 justify-center flex flex-col items-center"
        >
          {/* <Image
            src="/logoCapa.svg"
            alt="Quiz São João - Museu SENAI"
            width={800}
            height={1200}
            onClick={handleStartClick}
            className="cursor-pointer"
          /> */}


          <motion.div
            animate={{
              rotate: [0, 2, -2, 2, -2, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute top-20 right-36 z-10"
          >
            <Image
              src="/moon.svg"
              alt="Quiz São João - Museu SENAI"
              width={300}
              height={300}

            />
          </motion.div>


          <Image
            src="/images/logoCapa2.svg"
            alt="Quiz São João - Museu SENAI"
            width={800}
            height={1200}
            onClick={handleStartClick}
            className="cursor-pointer"
          />

          {/* nuvens esquerda p direita*/}

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 w-full h-auto -z-10"
          >
            <Image
              src="/clouds.svg"
              alt="Nuvens Loop - Esquerda para Direita"
              width={1000}
              height={1000}
            />
          </motion.div>




          {/* nuvensreverse*/}

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: ["100%", "-100%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-10 w-full h-auto -z-10"
          >
            <Image
              src="/clouds.svg"
              alt="Nuvens Loop - Esquerda para Direita"
              width={1000}
              height={1000}
            />
          </motion.div>




          <motion.div
            animate={{
              rotate: [0, 2, -2, 2, -2, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <Image
              src="/bandeirolas.svg"
              alt="Quiz São João - Bandeirolas"
              width={1200}
              height={1200}
            />
          </motion.div>
        </motion.div>
      </motion.div >
    </>
  )
}
