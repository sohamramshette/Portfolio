"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Section } from "@/components/layout/Section"
import { staggerContainer, smoothTween } from "@/lib/motion"
import { 
  Code2, 
  Layout, 
  BrainCircuit, 
  Server, 
  Database, 
  Wrench, 
  Cloud 
} from "lucide-react"

type Level = "Expert" | "Advanced" | "Intermediate" | "Familiar"

const skillCategories = [
  {
    title: "Programming",
    icon: <Code2 className="w-5 h-5 text-blue-500" />,
    skills: [
      { name: "Python", level: "Expert" as Level },
      { name: "C", level: "Advanced" as Level },
      { name: "HTML5", level: "Expert" as Level },
      { name: "CSS3", level: "Advanced" as Level },
      { name: "JavaScript", level: "Intermediate" as Level },
    ],
  },
  {
    title: "Web Development",
    icon: <Layout className="w-5 h-5 text-purple-500" />,
    skills: [
      { name: "React.js", level: "Intermediate" as Level },
      { name: "Next.js", level: "Intermediate" as Level },
      { name: "Tailwind CSS", level: "Advanced" as Level },
      { name: "Framer Motion", level: "Intermediate" as Level },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: <BrainCircuit className="w-5 h-5 text-emerald-500" />,
    skills: [
      { name: "IBM Watsonx", level: "Advanced" as Level },
      { name: "Prompt Engineering", level: "Expert" as Level },
      { name: "LLM Integration", level: "Intermediate" as Level },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="w-5 h-5 text-rose-500" />,
    skills: [
      { name: "Flask", level: "Advanced" as Level },
      { name: "Node.js", level: "Familiar" as Level },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="w-5 h-5 text-amber-500" />,
    skills: [
      { name: "SQL", level: "Advanced" as Level },
      { name: "MongoDB", level: "Familiar" as Level },
    ],
  },
  {
    title: "Developer Tools",
    icon: <Wrench className="w-5 h-5 text-slate-400" />,
    skills: [
      { name: "Git", level: "Advanced" as Level },
      { name: "GitHub", level: "Expert" as Level },
      { name: "VS Code", level: "Expert" as Level },
      { name: "Linux", level: "Advanced" as Level },
    ],
  },
  {
    title: "Cloud & Platforms",
    icon: <Cloud className="w-5 h-5 text-cyan-500" />,
    skills: [
      { name: "Vercel", level: "Advanced" as Level },
      { name: "Render", level: "Advanced" as Level },
      { name: "Firebase", level: "Intermediate" as Level },
    ],
  },
]

const getLevelColor = (level: Level) => {
  switch (level) {
    case "Expert": return "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
    case "Advanced": return "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
    case "Intermediate": return "bg-accent shadow-[0_0_10px_rgba(6,182,212,0.8)]"
    case "Familiar": return "bg-slate-400 shadow-[0_0_10px_rgba(148,163,184,0.8)]"
  }
}

export function Skills() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Section 
      id="skills" 
      title={<>Technical <span className="text-gradient">Arsenal</span></>}
      subtitle="A categorized overview of the technologies, frameworks, and tools I use to build scalable solutions."
    >
      <motion.div 
        variants={shouldReduceMotion ? {} : staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10"
      >
        {skillCategories.map((category, index) => (
          <SkillCard key={category.title} category={category} index={index} shouldReduceMotion={!!shouldReduceMotion} />
        ))}
      </motion.div>
    </Section>
  )
}

function SkillCard({ category, index, shouldReduceMotion }: { category: any, index: number, shouldReduceMotion: boolean }) {
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
      className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.15)] flex flex-col h-full border border-white/20 dark:border-white/5"
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

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 p-24 bg-primary/5 rounded-full blur-[80px] -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors duration-700 z-0"></div>
      
      <div className="relative z-10 flex items-center space-x-4 mb-8">
        <div className="p-3 bg-white/5 dark:bg-black/20 rounded-2xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
          {category.icon}
        </div>
        <h3 className="text-xl font-bold text-foreground/90 tracking-tight">{category.title}</h3>
      </div>
      
      <div className="flex flex-col space-y-4 relative z-10 flex-grow">
        {category.skills.map((skill: any) => (
          <div key={skill.name} className="flex items-center justify-between group/skill">
            <span className="text-sm font-semibold text-foreground/80 group-hover/skill:text-primary transition-colors duration-300">{skill.name}</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider">{skill.level}</span>
              <div className={`w-2 h-2 rounded-full ${getLevelColor(skill.level)}`}></div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
