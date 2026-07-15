"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { NightSkyCanvas } from "./NightSkyCanvas"

interface LoaderProps {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const [isReady, setIsReady] = useState(false)
  const [isWarping, setIsWarping] = useState(false)
  const [moonError, setMoonError] = useState(false)
  
  const shouldReduceMotion = useReducedMotion()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("hasEnteredPortfolio")) {
        onComplete()
        return
      }
    }

    audioRef.current = new Audio("/ambient-night.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.2
    
    const timer = setTimeout(() => setIsReady(true), 500)
    return () => clearTimeout(timer)
  }, [onComplete])

  const handleEnter = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasEnteredPortfolio", "true")
    }
    setIsWarping(true)
    
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }

    // 1-second hyperspace warp sequence (accelerated)
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  // Camera drift + Hyperspace Zoom
  const cameraAnim = isWarping 
    ? { scale: 3, opacity: 0, filter: "blur(20px)" }
    : shouldReduceMotion 
      ? { scale: 1 }
      : { scale: [1, 1.02, 1], x: ["-1%", "1%", "-1%"], y: ["-0.5%", "0.5%", "-0.5%"] }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#010204] text-white overflow-hidden"
      initial={{ opacity: 1, filter: "blur(0px)" }}
    >
      {/* Layer 3: Deep Space Nebula */}
      <motion.div 
        className="absolute inset-0 z-[-3]"
        animate={isWarping ? { filter: "blur(40px)", opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#010204] via-[#02050E] to-[#010208]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,35,80,0.15)_0%,transparent_70%)] mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(50,20,70,0.1)_0%,transparent_60%)] mix-blend-screen" />
      </motion.div>

      {/* Layer 1, 2, 6, 7, 8: Hardware Accelerated Living Space Engine */}
      <div className="absolute inset-0 z-[-2]">
        <NightSkyCanvas isWarping={isWarping} />
      </div>

      {/* Camera Container */}
      <motion.div 
        className="absolute inset-[-5%] w-[110%] h-[110%] pointer-events-none z-[-1]"
        animate={cameraAnim}
        transition={isWarping ? { duration: 0.9, ease: "easeIn" } : { duration: 60, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Layer 5: Photorealistic Moon (Upper Right) */}
        {!moonError && (
          <motion.div
            className="absolute top-[8%] right-[10%] md:right-[15%] w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center z-10"
            animate={shouldReduceMotion || isWarping ? {} : { y: [-5, 5, -5], rotate: [0, 2, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Volumetric Atmospheric Bloom */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_250px_100px_rgba(150,200,255,0.1),_0_0_100px_30px_rgba(200,220,255,0.15)] bg-white/5 blur-xl mix-blend-screen" />
            
            <Image 
              src="/moon.webp" 
              alt="Realistic Moon" 
              fill 
              sizes="(max-width: 768px) 192px, 256px"
              priority
              className="object-cover rounded-full mix-blend-screen opacity-95 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              onError={() => setMoonError(true)}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Layer 9: White Flash for Warp Exit */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            className="absolute inset-0 bg-white z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>

      {/* Click Anywhere Overlay */}
      {isReady && !isWarping && (
        <div 
          className="absolute inset-0 z-[300] cursor-pointer" 
          onClick={handleEnter} 
          aria-label="Click anywhere to enter"
        />
      )}

      {/* Text Overlay (Centered perfectly in the negative space) */}
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none pb-[10%]">
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isWarping ? { opacity: 0, y: -50, scale: 0.8, filter: "blur(10px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={isWarping ? { duration: 0.4 } : { duration: 2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Welcome to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-gray-400">
            Soham's World
          </span>
        </motion.h1>
        
        <motion.p
          className="text-lg md:text-2xl text-blue-100/70 mb-16 tracking-[0.3em] font-medium uppercase drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={isWarping ? { opacity: 0 } : { opacity: 1 }}
          transition={isWarping ? { duration: 0.3 } : { duration: 2, delay: 1.5 }}
        >
          Cybersecurity &bull; AI &bull; Engineering
        </motion.p>

        <AnimatePresence>
          {isReady && !isWarping && (
            <motion.div
              className="text-white/60 font-semibold tracking-[0.3em] uppercase text-sm animate-pulse"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Click anywhere to enter
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
