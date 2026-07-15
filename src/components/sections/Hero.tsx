"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { Download, Mail, Mouse } from "lucide-react"
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { TypeAnimation } from "react-type-animation"
import { premiumTransition, smoothTween } from "@/lib/motion"
import Image from "next/image"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], style: ["italic", "normal"] })

export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [imgError, setImgError] = useState(false)
  const [showScroll, setShowScroll] = useState(true)
  const heroRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScroll(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  // Spotlight Effect
  useEffect(() => {
    if (shouldReduceMotion) return
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePos({ x, y })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [shouldReduceMotion])

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden z-10 w-full">
      {/* Mouse Following Spotlight */}
      <div 
        className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none transition-opacity duration-700 hidden md:block"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(37, 99, 235, 0.15), transparent 40%)`
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col items-center text-center relative z-10">
        
        {/* Profile Image with Advanced Glowing Effects */}
        <motion.div
          initial={{ scale: shouldReduceMotion ? 1 : 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, ...premiumTransition }}
          className="relative mb-12 mt-12 group"
        >
          {/* Animated Glowing Borders */}
          <div className="absolute inset-[-8px] rounded-full bg-gradient-to-tr from-primary via-secondary to-accent animate-[spin_8s_linear_infinite] blur-[30px] opacity-40 group-hover:opacity-70 transition-opacity duration-1000 dark:opacity-70 dark:group-hover:opacity-100"></div>
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-primary via-accent to-secondary animate-[spin_5s_linear_infinite] opacity-60 dark:opacity-80"></div>
          
          <motion.div 
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-[4px] border-white/80 dark:border-white bg-[#020617] z-10 flex items-center justify-center shadow-[0_0_30px_rgba(96,165,250,0.3)] dark:shadow-[0_0_30px_rgba(96,165,250,0.4)] aspect-square transition-all duration-700"
            animate={shouldReduceMotion ? {} : { y: [-6, 6, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={shouldReduceMotion ? {} : { 
              scale: 1.05, 
              rotate: 2, 
              boxShadow: "0 0 60px rgba(37,99,235,0.4), 0 10px 40px rgba(0,0,0,0.3)"
            }}
          >
            {/* Glass Reflection Sweep (Passes every 8 seconds) */}
            <div className="absolute top-0 bottom-0 w-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent z-30 animate-glass-sweep pointer-events-none mix-blend-overlay"></div>
            
            {/* Static Subtle Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none z-20 mix-blend-overlay"></div>
            
            {!imgError ? (
              <Image 
                src="/profile.jpg" 
                alt="Soham Ramshette" 
                fill 
                className="object-cover object-center z-10 transition-transform duration-700 group-hover:scale-110" 
                sizes="(max-width: 768px) 128px, 160px" 
                priority
                quality={100}
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-5xl md:text-6xl text-white/90 font-black tracking-tighter z-10" aria-hidden="true">SR</span>
            )}
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 1.2, ...smoothTween }}
            className="absolute -bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap glass px-5 py-1.5 rounded-full z-30 flex items-center space-x-2 shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-blue-500/10 dark:border-white/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]" aria-hidden="true"></span>
            <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase text-foreground/90">Open to Internships</span>
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.4, ...smoothTween }}
          className="max-w-4xl flex flex-col items-center relative z-20"
        >
          <h1 className="font-bold tracking-tight mb-6 leading-[1.1] drop-shadow-2xl text-[#0F172A] dark:text-white max-w-5xl mx-auto">
            <div className="text-5xl md:text-7xl lg:text-[5.5rem] mb-2 md:mb-4">
              Hi, I'm <span className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-sky-400 dark:from-blue-600 dark:via-blue-400 dark:to-cyan-300 ${playfair.className}`}>Soham</span>
            </div>
            <div className="text-3xl md:text-5xl lg:text-6xl text-foreground/90">
              building the future with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-400 dark:from-orange-500 dark:to-yellow-400">AI, </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-500 to-cyan-400 dark:from-indigo-500 dark:via-blue-400 dark:to-cyan-300">Blockchain</span> & Code.
            </div>
          </h1>
          
          <p className="text-base md:text-xl text-foreground/70 mb-8 max-w-3xl leading-relaxed font-medium">
            I build intelligent web applications and blockchain solutions<br className="hidden md:block" />
            that solve real-world problems<br className="hidden md:block" />
            through clean design, scalable architecture, and practical innovation.
          </p>

          <div className="text-xl md:text-3xl font-bold mb-12 text-foreground/80 h-10 flex items-center justify-center tracking-tight">
            <span className="sr-only">Cybersecurity Engineer, AI Developer, Software Engineer</span>
            <TypeAnimation
              sequence={[
                'Building AI Applications',
                3000,
                'Creating Secure Systems',
                3000,
                'Working on Cybersecurity',
                3000,
                'Learning Every Day',
                3000
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              className="text-foreground/90 bg-clip-text"
              aria-hidden="true"
            />
          </div>

          {/* Premium CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-24">
            <MagneticButton 
              className="magnetic px-6 py-4 rounded-full glass-panel hover:bg-[#0A66C2]/10 border border-transparent hover:border-[#0A66C2]/30 transition-all duration-500 outline-none hover:shadow-[0_0_30px_rgba(10,102,194,0.15)] group relative overflow-hidden flex items-center space-x-3"
              onClick={() => window.open("https://www.linkedin.com/in/soham-ramshette-23096a383/", "_blank")}
            >
              <div className="absolute inset-0 bg-[#0A66C2]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <Linkedin size={22} className="text-[#0A66C2] group-hover:scale-110 group-hover:-translate-y-1 transition-transform relative z-10 duration-300" />
              <span className="font-bold relative z-10 text-foreground/90 group-hover:text-foreground transition-colors">Let's Connect</span>
            </MagneticButton>

            <MagneticButton 
              className="magnetic px-8 py-4 rounded-full bg-primary hover:bg-secondary text-white font-bold flex items-center space-x-3 transition-all duration-500 shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] group relative overflow-hidden"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <Download size={20} className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
              <span className="relative z-10">Download Resume</span>
            </MagneticButton>
            
            <div className="flex items-center gap-4">
              <MagneticButton 
                className="magnetic p-4 rounded-full glass-panel hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-500 outline-none hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group relative overflow-hidden"
                onClick={() => window.open("https://github.com/SohamRamshette", "_blank")}
              >
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <Github size={22} className="text-foreground/70 group-hover:text-foreground group-hover:rotate-12 transition-all relative z-10 duration-300" />
              </MagneticButton>
              <MagneticButton 
                className="magnetic p-4 rounded-full glass-panel hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-500 outline-none hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] group relative overflow-hidden"
                onClick={() => window.open("mailto:sohamramshette2007@gmail.com", "_blank")}
              >
                <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <Mail size={22} className="text-foreground/70 group-hover:text-foreground group-hover:scale-110 transition-all relative z-10 duration-300" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* Cinematic Scroll Indicator */}
        <AnimatePresence>
          {showScroll && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.8, ease: "easeIn" } }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-12 flex flex-col items-center text-foreground/40 pointer-events-none"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] mb-4 font-bold opacity-70">Scroll to Explore</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-foreground/40 to-transparent relative overflow-hidden">
                <motion.div 
                  className="w-full h-1/2 bg-foreground"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
