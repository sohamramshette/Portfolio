"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, X } from "lucide-react"

export function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false)
  const [inputBuffer, setInputBuffer] = useState("")
  
  const konamiCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba"
  const sudoCode = "sudo"
  const whoamiCode = "whoami"

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      setInputBuffer((prev) => {
        const newBuffer = (prev + e.key).slice(-50) // Keep last 50 chars
        
        if (
          newBuffer.endsWith(sudoCode) || 
          newBuffer.endsWith(whoamiCode) ||
          newBuffer.endsWith(konamiCode)
        ) {
          setIsOpen(true)
          return ""
        }
        
        return newBuffer
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.2)] font-mono text-sm"
          >
            {/* Terminal Header */}
            <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[#8b949e]">
                <Terminal size={16} />
                <span>guest@soham-portfolio:~</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[#8b949e] hover:text-white transition-colors"
                aria-label="Close terminal"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Terminal Body */}
            <div className="p-6 text-[#c9d1d9] space-y-4">
              <div>
                <span className="text-[#3fb950]">guest@soham-portfolio</span>
                <span className="text-white">:</span>
                <span className="text-[#a5d6ff]">~</span>
                <span className="text-white">$ </span>
                <span>whoami</span>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pl-4 space-y-2 border-l-2 border-[#3fb950]/30"
              >
                <p className="text-white font-bold text-base">Hello, I'm Soham Ramshette.</p>
                <p className="text-[#8b949e]">Future Cybersecurity Engineer & AI Developer.</p>
                <p className="text-[#8b949e] italic">Thanks for exploring my portfolio. I hope you enjoy the handcrafted details.</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <span className="text-[#3fb950]">guest@soham-portfolio</span>
                <span className="text-white">:</span>
                <span className="text-[#a5d6ff]">~</span>
                <span className="text-white">$ </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="inline-block w-2 h-4 bg-white align-middle"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
