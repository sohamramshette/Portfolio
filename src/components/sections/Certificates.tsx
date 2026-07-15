"use client"

import { useState, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ExternalLink, ShieldCheck, Cpu, Terminal, ShieldAlert } from "lucide-react"
import { Section } from "@/components/layout/Section"
import { staggerContainer, smoothTween } from "@/lib/motion"

const certificates = [
  {
    name: "Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    date: "2024",
    link: "", // Removed dummy links
    icon: <Cpu size={24} className="text-blue-500" />,
    color: "bg-blue-500/10",
    border: "border-blue-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
  },
  {
    name: "C Programming",
    issuer: "Coursera",
    date: "2023",
    link: "",
    icon: <Terminal size={24} className="text-emerald-500" />,
    color: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
  },
  {
    name: "Linux Fundamentals",
    issuer: "Red Hat / Coursera",
    date: "2024",
    link: "",
    icon: <Terminal size={24} className="text-red-500" />,
    color: "bg-red-500/10",
    border: "border-red-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]"
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    date: "Planned",
    link: "",
    planned: true,
    icon: <ShieldAlert size={24} className="text-amber-500" />,
    color: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
  }
]

export function Certificates() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Section 
      id="certificates" 
      title={<>Professional <span className="text-gradient">Certifications</span></>}
      subtitle="Industry-recognized credentials validating my expertise."
    >
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        variants={shouldReduceMotion ? {} : staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
      >
        {certificates.map((cert, index) => (
          <CertificateCard key={index} cert={cert} shouldReduceMotion={!!shouldReduceMotion} />
        ))}
      </motion.div>
    </Section>
  )
}

function CertificateCard({ cert, shouldReduceMotion }: { cert: any, shouldReduceMotion: boolean }) {
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
    setMousePos({ x: -1000, y: -1000 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={shouldReduceMotion ? {} : {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: smoothTween }
      }}
      className={`glass-panel p-8 rounded-[2rem] relative overflow-hidden group transition-all duration-500 hover:-translate-y-2 border border-white/20 dark:border-white/5 ${cert.glow} ${cert.planned ? 'opacity-70 border-dashed border-2' : ''} flex flex-col h-full`}
    >
      {/* Dynamic Cursor Light */}
      {!shouldReduceMotion && (
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.3), transparent 40%)`
          }}
        />
      )}

      {/* Decorative Blur */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${cert.color} rounded-full blur-[50px] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700 z-0 pointer-events-none`}></div>
      
      <div className="relative z-10 flex flex-col flex-grow">
        <div className={`p-4 glass rounded-2xl inline-flex w-fit mb-8 ${cert.border} border group-hover:scale-110 transition-transform duration-500 bg-white/5 shadow-inner`}>
          {cert.icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-foreground/90 tracking-tight leading-snug group-hover:text-primary transition-colors">{cert.name}</h3>
        
        <div className="mt-auto pt-4 border-t border-white/10 dark:border-white/5 flex flex-col gap-1">
          <p className="text-xs text-foreground/50 font-bold tracking-widest uppercase">{cert.issuer}</p>
          <p className="text-sm text-foreground/80 font-semibold">{cert.date}</p>
        </div>
        
        {cert.link && !cert.planned && (
          <a href={cert.link} className="inline-flex items-center space-x-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none mt-6 group/link">
            <ShieldCheck size={16} className="group-hover/link:scale-110 transition-transform" />
            <span>Verify Credential</span>
            <ExternalLink size={14} className="ml-auto opacity-50 group-hover/link:opacity-100 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-all" />
          </a>
        )}
        {cert.planned && (
          <div className="inline-flex items-center space-x-2 text-sm font-bold text-foreground/40 mt-6">
            <span className="w-2 h-2 rounded-full bg-amber-500/50 animate-pulse"></span>
            <span className="uppercase tracking-wider">In Progress</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
