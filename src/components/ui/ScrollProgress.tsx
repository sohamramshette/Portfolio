"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
      style={{
        scaleX,
        background: isDark
          ? "linear-gradient(90deg, #3B82F6, #60A5FA)"
          : "linear-gradient(90deg, #2563EB, #FF8A00)",
        boxShadow: isDark
          ? "0 0 10px rgba(59, 130, 246, 0.5)"
          : "0 0 10px rgba(255, 138, 0, 0.4)",
      }}
    />
  )
}
