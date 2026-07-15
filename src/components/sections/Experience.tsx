"use client"

import { useState, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SiCisco } from "react-icons/si"
import { Section } from "@/components/layout/Section"

// Official IBM 8-bar Logo SVG
const IbmLogo = ({ className, size = 28 }: { className?: string, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.986 16.485V15.5h6.028v.985h-6.028zm-3.048-1.748v-.985h12.126v.985H9.938zM25.32 12.01h-2.18l-1.464 2.102-1.465-2.102h-2.181l1.792 2.502H18.73v.975h.336l1.24 1.745h-2.905v.986h4.526l-1.897-2.65-.213-.298.24-.337.525-.733 1.353 1.89h1.332l1.352-1.89.525.732.24.338-.212.298-1.897 2.65h4.527v-.986h-2.905l1.24-1.745h.335v-.975h-1.092l1.791-2.502zm-12.335.727v-.985h-2.904v.985h2.904zm-1.093 5.485v.986H8.988v-.986h2.904zm2.187 0v.986h-1.094v-.986h1.094zm3.047 1.748v.986h-6.027v-.986h6.027zm1.093-1.748v.986H9.938v-.986h8.267zm2.748-6.212v.985H8.988v-.985h11.98zm-4.94 1.748v.986H8.988v-.986h7.038zm-1.093-1.748v.985H6.084v-.985h8.851zM6.084 13.722v.986h7.757v-.986H6.084zm0-2.453v.986h9.946v-.986H6.084zm0 6.96h2.905v.985H6.084v-.985zm0-1.75h4.94v.985H6.084v-.985zm0 3.5v.985h4.94v-.985H6.084zm0 1.75h6.035v.986H6.084v-.986zm20.895-4.5h-1.092L24.534 19h-1.12l-1.352-1.89-1.352 1.89h-1.122l-1.352-1.89-1.353 1.89h-1.12l1.912-2.671 2.387 3.327 2.387-3.327 1.912 2.671zm-4.354-6.23v.986h-2.904v-.986h2.904z"/>
  </svg>
)

const experiences = [
  {
    title: "Artificial Intelligence Intern",
    company: "IBM SkillsBuild",
    date: "July 2026",
    description: "Completed hands-on training in Artificial Intelligence, IBM Watsonx, Prompt Engineering, and practical AI applications.",
    icon: <IbmLogo className="text-white" size={28} />,
    iconBg: "bg-[#0530ad]",
  },
  {
    title: "Networking & Cybersecurity Intern",
    company: "Cisco",
    date: "July 2026",
    description: "Completed practical learning in Networking, Cybersecurity fundamentals, Cisco technologies, Packet Tracer and Network Security.",
    icon: <SiCisco className="text-white" size={28} />,
    iconBg: "bg-[#1ba0d7]",
  },
]

export function Experience() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Section 
      id="experience" 
      title={<>Professional <span className="text-gradient">Journey</span></>}
      subtitle="My internships and professional journey in the tech industry."
    >
      <div className="relative max-w-4xl mx-auto py-12">
        
        {/* Animated Light Beam (Timeline) */}
        {!shouldReduceMotion && (
          <motion.div 
            className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0 md:-translate-x-1/2 z-0 hidden md:block"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ originY: 0 }}
          />
        )}
        
        {/* Static Line for Mobile or Reduced Motion */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 md:-translate-x-1/2 z-0 block md:hidden"></div>

        <motion.div 
          className="space-y-24 relative z-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          variants={shouldReduceMotion ? {} : {
            hidden: {},
            show: {
              transition: { staggerChildren: 0.4, delayChildren: 0.8 }
            }
          }}
        >
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} shouldReduceMotion={!!shouldReduceMotion} />
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

function ExperienceCard({ exp, index, shouldReduceMotion }: { exp: any, index: number, shouldReduceMotion: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const isEven = index % 2 === 0
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: -1000, y: -1000 })
  }

  return (
    <motion.div
      variants={shouldReduceMotion ? {} : {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
      }}
      className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-center ${isEven ? "md:flex-row-reverse" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Node (Center Icon) */}
      <motion.div 
        className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center z-20 shadow-lg border-[3px] border-background overflow-hidden"
        animate={{
          boxShadow: isHovered 
            ? "0 0 25px rgba(255, 138, 0, 0.8), 0 0 10px rgba(255, 138, 0, 0.4) inset" 
            : "0 0 10px rgba(37, 99, 235, 0.3)",
          borderColor: isHovered ? "#FF8A00" : "var(--background)",
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <div className={`w-full h-full flex items-center justify-center ${exp.iconBg}`}>
          {exp.icon}
        </div>
        
        {/* Connecting beam reaction */}
        <motion.div 
          className="absolute inset-0 bg-accent/40 rounded-full mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Connection Line to Card (Desktop) */}
      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-[2px] z-10 transition-colors duration-300 ${isHovered ? 'bg-accent' : 'bg-primary/30'} ${isEven ? 'right-[calc(50%+20px)]' : 'left-[calc(50%+20px)]'}`}></div>

      {/* Card Content */}
      <div className={`w-full md:w-1/2 pl-[70px] md:pl-0 ${isEven ? "md:pr-8" : "md:pl-8"}`}>
        <motion.div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="glass-panel p-8 rounded-[2rem] relative overflow-hidden group transition-all duration-500 border border-white/20 dark:border-white/5 h-full"
          animate={{
            y: isHovered ? -5 : 0,
            boxShadow: isHovered 
              ? "0 20px 40px rgba(37, 99, 235, 0.15), 0 0 0 1px rgba(255, 138, 0, 0.3)" 
              : "0 10px 30px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Dynamic Cursor Light */}
          {!shouldReduceMotion && (
            <div 
              className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay"
              style={{
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 40%)`
              }}
            />
          )}

          {/* Subtle Orange Glow on Hover */}
          <motion.div 
            className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-[50px] -mr-16 -mt-16 z-0 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.5 : 0.5 }}
            transition={{ duration: 0.5 }}
          />
          
          <div className="relative z-10">
            <div className="flex flex-col mb-4 gap-2">
              <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest self-start mb-2 transition-colors duration-300 ${isHovered ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-primary/5 border-primary/20 text-primary'}`}>
                {exp.date}
              </span>
              <h3 className="text-2xl font-bold text-foreground/90 tracking-tight leading-snug">{exp.title}</h3>
              <h4 className="text-lg font-semibold text-foreground/60 tracking-wide flex items-center gap-2">
                {exp.company}
              </h4>
            </div>
            
            <p className="text-foreground/70 text-base leading-relaxed mt-4 pt-4 border-t border-white/10 dark:border-white/5">
              {exp.description}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
