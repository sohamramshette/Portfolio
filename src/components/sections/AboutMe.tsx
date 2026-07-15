"use client"

import { useState, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { User, MapPin, GraduationCap, Sparkles, Code2, Shield, Cpu } from "lucide-react"
import { Section } from "@/components/layout/Section"
import { fadeIn, staggerContainer, smoothTween } from "@/lib/motion"

export function AboutMe() {
  const shouldReduceMotion = useReducedMotion()

  const interests = [
    { name: "Cybersecurity", icon: <Shield size={20} className="text-blue-500" />, glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
    { name: "Artificial Intelligence", icon: <Cpu size={20} className="text-cyan-500" />, glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]" },
    { name: "Software Development", icon: <Code2 size={20} className="text-purple-500" />, glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]" },
  ]

  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [mousePosLeft, setMousePosLeft] = useState({ x: -1000, y: -1000 })
  const [mousePosRight, setMousePosRight] = useState({ x: -1000, y: -1000 })

  const handleMouseMoveLeft = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!leftRef.current) return
    const rect = leftRef.current.getBoundingClientRect()
    setMousePosLeft({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseMoveRight = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rightRef.current) return
    const rect = rightRef.current.getBoundingClientRect()
    setMousePosRight({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <Section 
      id="about" 
      title={<>About <span className="text-gradient">Me</span></>}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Main Profile Info */}
        <motion.div
          ref={leftRef}
          onMouseMove={handleMouseMoveLeft}
          onMouseLeave={() => setMousePosLeft({ x: -1000, y: -1000 })}
          variants={shouldReduceMotion ? {} : {
            hidden: { opacity: 0, x: -40, scale: 0.95 },
            show: { opacity: 1, x: 0, scale: 1, transition: smoothTween }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="lg:col-span-7 glass-panel rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden group border-t border-l border-white/20 dark:border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-transform duration-500"
        >
          {/* Dynamic Cursor Light */}
          {!shouldReduceMotion && (
            <div 
              className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay"
              style={{ background: `radial-gradient(400px circle at ${mousePosLeft.x}px ${mousePosLeft.y}px, rgba(255,255,255,0.4), transparent 40%)` }}
            />
          )}

          <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-[100px] -mr-16 -mt-16 pointer-events-none transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/20 opacity-50 z-0"></div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-10 flex items-center space-x-4 text-foreground/90 tracking-tight">
              <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20"><User size={24} /></div>
              <span>Personal Details</span>
            </h3>
            
            <div className="space-y-10 text-foreground/80">
              <div className="flex items-start space-x-6 group/item cursor-default">
                <div className="p-4 glass rounded-2xl text-primary shadow-inner group-hover/item:scale-110 transition-transform duration-300 border border-primary/20 bg-primary/5"><User size={24} /></div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold mb-1">Full Name</p>
                  <p className="text-xl font-bold tracking-tight text-foreground/90 group-hover/item:text-primary transition-colors duration-300">Soham Balaji Ramshette</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6 group/item cursor-default">
                <div className="p-4 glass rounded-2xl text-accent shadow-inner group-hover/item:scale-110 transition-transform duration-300 border border-accent/20 bg-accent/5"><GraduationCap size={24} /></div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold mb-1">Role & Education</p>
                  <p className="text-xl font-bold tracking-tight text-foreground/90 group-hover/item:text-accent transition-colors duration-300">B.Tech Computer Engineering Student</p>
                  <p className="text-base text-foreground/60 mt-1 font-medium">MIT Academy of Engineering (MITAOE)</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group/item cursor-default">
                <div className="p-4 glass rounded-2xl text-secondary shadow-inner group-hover/item:scale-110 transition-transform duration-300 border border-secondary/20 bg-secondary/5"><MapPin size={24} /></div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold mb-1">Location</p>
                  <p className="text-xl font-bold tracking-tight text-foreground/90 group-hover/item:text-secondary transition-colors duration-300">Latur, Maharashtra</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interests & Highlights */}
        <motion.div
          ref={rightRef}
          onMouseMove={handleMouseMoveRight}
          onMouseLeave={() => setMousePosRight({ x: -1000, y: -1000 })}
          variants={shouldReduceMotion ? {} : {
            hidden: { opacity: 0, x: 40, scale: 0.95 },
            show: { opacity: 1, x: 0, scale: 1, transition: smoothTween }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="lg:col-span-5 flex flex-col h-full"
        >
          <div className="glass-panel rounded-[2.5rem] p-10 md:p-12 flex-1 relative overflow-hidden group border-t border-l border-white/20 dark:border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-transform duration-500">
            {/* Dynamic Cursor Light */}
            {!shouldReduceMotion && (
              <div 
                className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay"
                style={{ background: `radial-gradient(400px circle at ${mousePosRight.x}px ${mousePosRight.y}px, rgba(255,255,255,0.4), transparent 40%)` }}
              />
            )}

            <div className="absolute bottom-0 left-0 p-32 bg-accent/10 rounded-full blur-[100px] -ml-16 -mb-16 pointer-events-none transition-all duration-700 group-hover:scale-150 group-hover:bg-accent/20 opacity-50 z-0"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-10 flex items-center space-x-4 text-foreground/90 tracking-tight">
                <div className="p-3 bg-accent/10 rounded-xl text-accent border border-accent/20"><Sparkles size={24} /></div>
                <span>Interests</span>
              </h3>
              
              <motion.div 
                variants={shouldReduceMotion ? {} : staggerContainer(0.15)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col gap-5"
              >
                {interests.map((interest) => (
                  <motion.div
                    key={interest.name}
                    variants={shouldReduceMotion ? {} : {
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                    }}
                    className={`flex items-center space-x-5 p-6 glass rounded-2xl hover:bg-white/10 dark:hover:bg-white/5 transition-all cursor-default border border-white/10 dark:border-white/5 hover:-translate-y-1 ${interest.glow} shadow-inner`}
                  >
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10 shadow-sm">{interest.icon}</div>
                    <span className="font-bold text-lg tracking-tight text-foreground/90">{interest.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
          
        </motion.div>
      </div>
    </Section>
  )
}
