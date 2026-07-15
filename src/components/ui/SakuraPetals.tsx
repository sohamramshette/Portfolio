"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Petal {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  colorClass: string
}

const PETAL_COLORS = [
  "bg-orange-400/40 dark:bg-orange-500/30",
  "bg-pink-400/40 dark:bg-pink-500/30",
  "bg-red-400/40 dark:bg-red-500/30",
  "bg-white/50 dark:bg-white/30"
]

export function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    // Generate petals only on client to avoid hydration mismatch
    const newPetals = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: -10 - Math.random() * 20, // start above screen
      size: Math.random() * 10 + 5, // size between 5 and 15px
      duration: Math.random() * 10 + 10, // fall duration between 10s and 20s
      delay: Math.random() * 20, // delay before starting
      colorClass: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }))
    setPetals(newPetals)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className={`absolute rounded-tl-full rounded-br-full rounded-tr-md rounded-bl-md ${petal.colorClass}`}
          style={{
            width: petal.size,
            height: petal.size * 1.5,
            left: `${petal.x}%`,
            top: `${petal.y}%`,
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [
              "0vw",
              `${Math.sin(petal.id) * 10}vw`,
              `${Math.cos(petal.id) * 10}vw`,
              `${Math.sin(petal.id) * 20}vw`,
            ],
            rotate: [0, 180, 360, 720],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
