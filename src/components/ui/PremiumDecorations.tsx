"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useTheme } from "next-themes"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: 'particle' | 'leaf' | 'line' | 'circle' | 'blob' | 'plus' | 'diamond'
  layer: number
}

function ParticleNode({ p, isDark, ySpring }: { p: Particle, isDark: boolean, ySpring: any }) {
  // Colors
  let bg = "bg-white/10"
  let border = ""
  let filter = ""
  let text = ""

  if (p.type === 'particle') {
    bg = isDark ? "bg-blue-400/20" : "bg-orange-400/20"
    filter = "blur(1px)"
  } else if (p.type === 'leaf') {
    bg = isDark ? "bg-white/5" : "bg-gradient-to-tr from-[#FF6B35] to-[#FFA726] opacity-15"
    border = "rounded-tl-full rounded-br-full rounded-tr-md rounded-bl-md"
  } else if (p.type === 'line') {
    bg = isDark ? "bg-white/5" : "bg-gradient-to-b from-transparent via-[#FF8A00]/20 to-transparent"
  } else if (p.type === 'circle') {
    bg = "bg-transparent border border-white/5"
    if (!isDark) bg = "bg-transparent border border-[#FFB74D]/20"
    border = "rounded-full"
  } else if (p.type === 'blob') {
    bg = isDark ? "bg-blue-500/5" : "bg-[#FFD180]/10"
    filter = "blur(60px)"
    border = "rounded-full"
  } else if (p.type === 'plus') {
    bg = "transparent"
    text = isDark ? "text-white/10" : "text-[#FF8A00]/15"
  } else if (p.type === 'diamond') {
    bg = isDark ? "bg-white/5" : "bg-[#FFB74D]/15"
    border = "rotate-45"
  }

  const parallaxY = useTransform(ySpring, [0, 5000], [0, p.layer * -100])

  return (
    <motion.div
      className={`absolute flex items-center justify-center ${bg} ${border}`}
      style={{
        width: p.type === 'line' ? 1 : p.size,
        height: p.type === 'line' ? p.size : p.size,
        left: `${p.x}%`,
        top: `${p.y}%`,
        filter,
        y: parallaxY
      }}
      animate={{
        x: [0, p.layer * 10, -p.layer * 10, 0],
        y: [0, p.layer * 15, -p.layer * 5, 0],
        rotate: p.type === 'blob' || p.type === 'particle' ? 0 : [0, 180, 360],
        scale: [1, 1.1, 0.9, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {p.type === 'plus' && <span className={`${text} text-xl font-light`}>+</span>}
    </motion.div>
  )
}

export function PremiumDecorations() {
  const [particles, setParticles] = useState<Particle[]>([])
  const { theme } = useTheme()
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  
  // Parallax Setup
  const { scrollY } = useScroll()
  const ySpring = useSpring(scrollY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    // Generate 5 layers of particles
    const newParticles: Particle[] = []
    
    const addLayer = (count: number, layer: number, type: Particle['type'], sizeRange: [number, number], durRange: [number, number]) => {
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
          duration: Math.random() * (durRange[1] - durRange[0]) + durRange[0],
          delay: Math.random() * 20,
          type,
          layer
        })
      }
    }

    addLayer(40, 1, 'particle', [2, 6], [10, 20]) // Layer 1: Tiny glowing particles
    addLayer(15, 2, 'leaf', [10, 25], [15, 25])   // Layer 2: Orange floating leaves
    addLayer(10, 3, 'line', [30, 80], [20, 35])   // Layer 3: Thin glowing lines
    addLayer(15, 4, 'circle', [8, 30], [25, 40])  // Layer 4: Glass circles
    addLayer(8, 5, 'blob', [100, 300], [30, 50])  // Layer 5: Large blurred blobs
    addLayer(12, 2, 'plus', [10, 20], [15, 25])   // Extras
    addLayer(10, 3, 'diamond', [15, 25], [20, 30]) // Extras

    setParticles(newParticles)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX / window.innerWidth - 0.5
      mouseY.current = e.clientY / window.innerHeight - 0.5
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Corner X Lines */}
      <div className="absolute top-10 left-10 opacity-10 hidden dark:block">
        <svg width="100" height="100" className="animate-spin-slow"><path d="M10 10l80 80M90 10L10 90" stroke="#FF8A00" strokeWidth="1" fill="none"/></svg>
      </div>
      <div className="absolute top-10 right-10 opacity-10 hidden dark:block">
        <svg width="100" height="100" className="animate-spin-slow"><path d="M10 10l80 80M90 10L10 90" stroke="#FF8A00" strokeWidth="1" fill="none"/></svg>
      </div>
      <div className="absolute bottom-10 left-10 opacity-10 hidden dark:block">
        <svg width="100" height="100" className="animate-spin-slow"><path d="M10 10l80 80M90 10L10 90" stroke="#FF8A00" strokeWidth="1" fill="none"/></svg>
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 hidden dark:block">
        <svg width="100" height="100" className="animate-spin-slow"><path d="M10 10l80 80M90 10L10 90" stroke="#FF8A00" strokeWidth="1" fill="none"/></svg>
      </div>

      {particles.map((p) => {
        const isDark = theme === "dark"
        return <ParticleNode key={p.id} p={p} isDark={isDark} ySpring={ySpring} />
      })}
    </div>
  )
}
