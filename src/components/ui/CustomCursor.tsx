"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useTheme } from "next-themes"

interface Particle {
  id: number
  x: number
  y: number
  size: number
}

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [particles, setParticles] = useState<Particle[]>([])
  
  const particleIdCounter = useRef(0)
  const lastParticleTime = useRef(0)

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.add('hide-cursor')
    return () => {
      document.documentElement.classList.remove('hide-cursor')
    }
  }, [])

  useEffect(() => {
    if (!mounted || shouldReduceMotion || typeof window === "undefined") return

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      const now = Date.now()
      if (now - lastParticleTime.current > 40) {
        const id = particleIdCounter.current++
        setParticles(prev => [...prev, { id, x: e.clientX, y: e.clientY, size: Math.random() * 4 + 2 }])
        lastParticleTime.current = now

        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== id))
        }, 600)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const clickable = target.closest('a, button, [role="button"]')
      const isCard = target.closest('.project-card, .glass-panel')
      
      if (clickable) {
        setCursorVariant("magnetic")
      } else if (isCard) {
        setCursorVariant("card")
      }
    }

    const handleMouseOut = () => {
      setCursorVariant("default")
    }

    window.addEventListener("mousemove", mouseMove)
    document.body.addEventListener("mouseover", handleMouseOver)
    document.body.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      document.body.removeEventListener("mouseover", handleMouseOver)
      document.body.removeEventListener("mouseout", handleMouseOut)
    }
  }, [mounted, shouldReduceMotion])

  if (!mounted || shouldReduceMotion) return null

  const isDark = theme === "dark"

  const orbVariants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
      opacity: isDark ? 0.9 : 1,
    },
    magnetic: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1.8,
      opacity: 1,
    },
    card: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 0.5,
      opacity: 0.5,
    }
  }

  const auraVariants = {
    default: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1,
      opacity: isDark ? 0.4 : 0.6,
    },
    magnetic: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      opacity: 0.8,
    },
    card: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 2,
      opacity: 0.2,
    }
  }

  // Theme-specific styles
  const auraStyle = isDark 
    ? "bg-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.6)]" 
    : "bg-blue-400/30 shadow-[0_0_40px_rgba(37,99,235,0.4)]"
    
  const orbStyle = isDark
    ? "bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,1)]"
    : "bg-white shadow-[0_0_20px_rgba(255,255,255,1),_0_0_10px_rgba(37,99,235,0.5)]"

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] hidden md:block overflow-hidden ${isDark ? 'mix-blend-screen' : 'mix-blend-normal'}`}>
      
      {/* Outer Plasma Aura */}
      <motion.div
        className={`absolute top-0 left-0 w-12 h-12 rounded-full blur-md transition-colors duration-700 ${auraStyle}`}
        variants={auraVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
      />

      {/* Core Plasma Orb */}
      <motion.div
        className={`absolute top-0 left-0 w-4 h-4 rounded-full blur-[1px] transition-colors duration-700 ${orbStyle}`}
        variants={orbVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.2 }}
      />

      {/* Particle Trail */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: isDark ? 0.8 : 0.5, scale: 1, x: p.x - p.size/2, y: p.y - p.size/2 }}
            animate={{ opacity: 0, scale: 0, x: p.x - p.size/2, y: p.y + 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`absolute rounded-full ${isDark ? 'bg-blue-200 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'}`}
            style={{ width: p.size, height: p.size }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
