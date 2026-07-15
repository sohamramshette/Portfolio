"use client"

import { motion, useReducedMotion } from "framer-motion"
import { GraduationCap, Award, BookOpen } from "lucide-react"
import { Section } from "@/components/layout/Section"
import { fadeIn } from "@/lib/motion"

export function Education() {
  const shouldReduceMotion = useReducedMotion()

  const educations = [
    {
      title: "B.Tech Computer Engineering",
      institution: "MIT Academy of Engineering (MITAOE)",
      year: "2025 - Present",
      score: "Pursuing",
      details: "SEM I CGPA: 8.57 | SEM II CGPA: 8.76",
      icon: <GraduationCap size={20} className="text-primary" />,
    },
    {
      title: "Higher Secondary Certificate (HSC)",
      institution: "State Board",
      year: "Completed",
      score: "80%",
      details: "MHT CET: 95.38 Percentile | JEE: 88 Percentile",
      icon: <BookOpen size={20} className="text-secondary" />,
    },
    {
      title: "Secondary School Certificate (SSC)",
      institution: "State Board",
      year: "Completed",
      score: "94%",
      icon: <Award size={20} className="text-accent" />,
    },
  ]

  return (
    <Section 
      id="education" 
      title={<>My <span className="text-gradient">Education</span></>}
    >
      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-secondary/30 to-transparent -translate-x-1/2 hidden md:block"></div>
        
        <div className="space-y-16">
          {educations.map((edu, index) => (
            <motion.div
              key={index}
              variants={shouldReduceMotion ? {} : fadeIn("up", index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10%" }}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full glass flex items-center justify-center -translate-x-1/2 z-10 hidden md:flex shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                {edu.icon}
              </div>
              
              {/* Content Card */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}>
                <div className="glass-panel p-8 rounded-3xl hover:bg-white/5 transition-colors duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors duration-700"></div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground/90 leading-snug">{edu.title}</h3>
                    <span className="px-4 py-1.5 text-xs font-bold rounded-full bg-primary/10 text-primary whitespace-nowrap uppercase tracking-widest border border-primary/20 self-start">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-foreground/70 text-lg mb-4 tracking-tight">{edu.institution}</p>
                  <div className="flex items-center gap-2 mb-4 text-foreground/90 font-medium">
                    <span className="text-primary font-bold uppercase tracking-wider text-sm">Score:</span> 
                    <span className="text-lg">{edu.score}</span>
                  </div>
                  {edu.details && (
                    <div className="flex flex-col gap-4 mt-2">
                      {edu.details.split(" | ").map((detail, i) => {
                        const [label, val] = detail.split(": ")
                        return (
                          <div key={i} className="flex items-center gap-2 text-foreground/90 font-medium">
                            <span className="text-primary font-bold uppercase tracking-wider text-sm">{label}:</span> 
                            <span className="text-lg">{val}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
