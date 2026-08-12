"use client"

import { useState, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { ExternalLink, Calendar, Activity, FileText, ImageIcon } from "lucide-react"
import { FaGithub as Github } from "react-icons/fa"
import Link from "next/link"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { Section } from "@/components/layout/Section"
import { fadeIn } from "@/lib/motion"

const projects = [
  {
    slug: "quizzpulse",
    title: "QuizzPulse",
    description: "Real-time full-stack quiz platform featuring server-synchronized countdown timers, Socket.io updates, and automated leaderboard ranking.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/sohamramshette/QuizzPulse",
    demo: "https://quize-phi-two.vercel.app/",
    status: "Completed",
    year: "August 2026",
    color: "from-pink-500/30 to-rose-500/30",
  },
  {
    slug: "scamshield",
    title: "ScamShield AI",
    description: "AI-powered cybersecurity platform protecting users from digital frauds by analyzing websites, QR codes, and UPI IDs.",
    tags: ["React", "FastAPI", "IBM Granite AI", "PostgreSQL"],
    github: "https://github.com/sohamramshette/ScamShield/",
    demo: "https://scamshield-sr11.vercel.app/",
    status: "Completed",
    year: "July 2026",
    color: "from-blue-500/30 to-purple-500/30",
  },
  {
    slug: "admissionmate-ai",
    title: "AdmissionMate AI",
    description: "AI college admission assistant helping students navigate the admission process with ease. Powered by advanced NLP.",
    tags: ["Flask", "IBM Watsonx AI", "Python", "HTML/CSS"],
    github: "https://github.com/sohamramshette/AdmissionMate-AI",
    pdf: "/AdmissionMate-AI.pdf",
    demo: "https://admissionmate-ai.onrender.com/",
    status: "Completed",
    year: "July 2026",
    color: "from-blue-500/30 to-cyan-500/30",
  },
  {
    slug: "blockchain-e-voting-system",
    title: "Blockchain E-Voting System",
    description: "A Secure, Transparent and Tamper-Detectable Electronic Voting Platform Powered by Blockchain Technology.",
    tags: ["Python", "Flask", "Blockchain", "Web"],
    github: "https://github.com/sohamramshette/Blockchain-E-Voting-System",
    demo: "https://blockchain-e-voting-system-ryuz.onrender.com/",
    pdf: "/Blockchain-E-Voting-System.pdf",
    status: "Completed",
    year: "April 2026",
    color: "from-indigo-500/30 to-blue-500/30",
  },
  {
    slug: "medsync-ai",
    title: "MedSync AI",
    description: "An intelligent medicine management platform to remind patients and synchronize prescriptions with doctors.",
    tags: ["Python", "AI", "Web"],
    github: "https://github.com/SohamRamshette",
    demo: "",
    status: "Completed",
    year: "March 2026",
    color: "from-orange-500/30 to-red-500/30",
  },
  {
    slug: "library-management-system",
    title: "Library Management System",
    description: "Robust Python-based software for managing library operations, including book issuance, returns, and inventory tracking.",
    tags: ["Python", "SQL", "Tkinter"],
    github: "https://github.com/SohamRamshette",
    demo: "",
    status: "Completed",
    year: "Dec 2025",
    color: "from-purple-500/30 to-pink-500/30",
  },
  {
    slug: "traffic-light-controller",
    title: "Traffic Light Controller",
    description: "Digital electronics hardware project using CD4017 decade counter to simulate a realistic traffic light sequence.",
    tags: ["Electronics", "CD4017", "Hardware"],
    github: "",
    pdf: "/Traffic-Light-Controller.pdf",
    poster: "/Traffic-Light-Controller-Poster.png",
    demo: "",
    status: "Completed",
    year: "April 2026",
    color: "from-emerald-500/30 to-teal-500/30",
  },
  {
    slug: "future-cybersecurity-toolkit",
    title: "Future Cybersecurity Toolkit",
    description: "A comprehensive suite of cybersecurity scripts and tools. Currently under active development.",
    tags: ["Python", "Security", "Networking"],
    github: "",
    demo: "",
    status: "In Progress",
    year: "2026",
    color: "from-slate-500/30 to-gray-500/30",
  },
]

export function FeaturedProjects() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Section 
      id="projects" 
      title={<>Featured <span className="text-gradient">Work</span></>}
    >
      <div className="flex flex-col gap-24 md:gap-40">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0
          
          return (
            <ProjectCard key={project.slug} project={project} isEven={isEven} shouldReduceMotion={!!shouldReduceMotion} index={index} />
          )
        })}
      </div>
    </Section>
  )
}

function ProjectCard({ project, isEven, shouldReduceMotion, index }: { project: any, isEven: boolean, shouldReduceMotion: boolean, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isHovered, setIsHovered] = useState(false)

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
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      variants={shouldReduceMotion ? {} : fadeIn("up", 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className={`project-card flex flex-col md:flex-row gap-8 lg:gap-16 items-center group ${!isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Project Image / Placeholder with Animated Gradient Border */}
      <div className="w-full md:w-1/2 relative">
        {/* Animated Gradient Border Wrapper */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-primary/30 to-white/10 rounded-[2rem] p-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-700 z-0">
          <div className="absolute inset-0 rounded-[2rem] bg-background"></div>
        </div>

        <Tilt
          tiltMaxAngleX={shouldReduceMotion ? 0 : 4}
          tiltMaxAngleY={shouldReduceMotion ? 0 : 4}
          glareEnable={!shouldReduceMotion}
          glareMaxOpacity={0.2}
          glareColor="#ffffff"
          glarePosition="all"
          transitionSpeed={2000}
          scale={1.02}
          className="w-full h-[280px] md:h-[400px] rounded-[2rem] overflow-hidden glass relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-shadow duration-700 group-hover:shadow-[0_30px_80px_rgba(37,99,235,0.25)] border border-white/20 dark:border-white/10"
        >
          {/* Dynamic Cursor Light */}
          {!shouldReduceMotion && (
            <div 
              className="absolute inset-0 z-40 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none mix-blend-overlay"
              style={{
                background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 40%)`
              }}
            />
          )}

          <Link href={`/projects/${project.slug}`} className="absolute inset-0 block focus-visible:ring-4 focus-visible:ring-primary rounded-[2rem] z-30 outline-none" aria-label={`View details for ${project.title}`}>
            <span className="sr-only">View {project.title}</span>
          </Link>
          
          {/* Elegant Abstract Placeholder */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} group-hover:scale-110 transition-transform duration-1000 ease-[0.25,0.1,0.25,1] flex items-center justify-center overflow-hidden`}>
            {/* Glass refraction overlays */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent mix-blend-overlay z-10"></div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/10 backdrop-blur-3xl rounded-full rotate-45 blur-[40px] z-0"></div>
            
            <motion.span 
              className="text-5xl md:text-7xl font-black text-white/30 tracking-tighter mix-blend-overlay relative z-10 drop-shadow-2xl"
              animate={isHovered ? { scale: 1.1, filter: "blur(4px)" } : { scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
            >
              {project.title.split(' ')[0]}
            </motion.span>
          </div>
        </Tilt>
      </div>

      {/* Project Info */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        {/* Meta details */}
        <div className="flex items-center gap-4 mb-4 text-xs font-bold uppercase tracking-widest text-foreground/50">
          <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {project.year}</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="flex items-center gap-1.5"><Activity size={14} className={project.status === 'Completed' ? "text-emerald-500" : "text-amber-500"} /> {project.status}</span>
        </div>

        <h3 className="text-3xl md:text-5xl font-black mb-6 text-foreground/90 group-hover:text-primary transition-colors duration-500 tracking-tighter">
          {project.title}
        </h3>
        
        {/* Animated Technology Badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag: string, i: number) => (
            <span key={i} className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/5 dark:bg-white/10 text-foreground/80 border border-white/20 dark:border-white/10 tracking-wide hover:bg-primary/20 hover:text-primary hover:border-primary/40 hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all cursor-default">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-foreground/80 text-xl md:text-2xl mb-10 leading-relaxed font-medium">
          {project.description}
        </p>
        
        {/* Buttons sliding up on hover */}
        <motion.div 
          className="flex items-center gap-4 flex-wrap"
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Link href={`/projects/${project.slug}`}>
            <MagneticButton className="px-8 py-3.5 rounded-full bg-primary text-white font-bold hover:bg-secondary transition-all shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.5)] focus-visible:ring-4 focus-visible:ring-primary outline-none">
              View Case Study
            </MagneticButton>
          </Link>

          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="p-3.5 rounded-full glass-panel hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none text-foreground/80 hover:text-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" aria-label="View Source Code">
              <Github size={20} />
            </a>
          )}

          {project.pdf && (
            <a href={project.pdf} target="_blank" rel="noreferrer" className="p-3.5 rounded-full glass-panel hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none text-foreground/80 hover:text-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" aria-label="View PDF Document">
              <FileText size={20} />
            </a>
          )}

          {project.poster && (
            <a href={project.poster} target="_blank" rel="noreferrer" className="p-3.5 rounded-full glass-panel hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none text-foreground/80 hover:text-foreground hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]" aria-label="View Poster">
              <ImageIcon size={20} />
            </a>
          )}
          
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="p-3.5 rounded-full glass-panel hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none text-primary hover:text-primary/80 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]" aria-label="View Live Demo">
              <ExternalLink size={20} />
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
