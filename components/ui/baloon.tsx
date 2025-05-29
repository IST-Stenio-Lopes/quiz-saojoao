"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Balloon() {
  const [xPosition, setXPosition] = useState(0)
  const [size, setSize] = useState(40 + Math.random() * 60)
  const [flip, setFlip] = useState(1)

  useEffect(() => {
    setXPosition(Math.random() * 100)
    setFlip(Math.random() > 0.5 ? 1 : -1) // Aplica flip aleatório
  }, [])

  return (
    <motion.div
      initial={{ y: "100vh", opacity: 0 }}
      animate={{ y: "-20vh", opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 8 + Math.random() * 4,
        ease: "linear",
      }}
      style={{
        position: "absolute",
        left: `${xPosition}%`,
        width: size,
        height: size,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: "url('/balao.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transform: `scaleX(${flip})`,
        }}
      />
    </motion.div>
  )
}
