"use client"

import { use, useEffect, useState } from "react"
import { AuroraBackground } from "@/components/ui/AuroraBackground"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CustomCursor } from "@/components/ui/CustomCursor"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, FileText, ImageIcon, CheckCircle2, Target, Zap, LayoutTemplate } from "lucide-react"
import { FaGithub as Github } from "react-icons/fa"

const projectDB: Record<string, any> = {
  "admissionmate-ai": {
    title: "AdmissionMate AI",
    tagline: "Helping students make smarter college admission decisions using IBM Watsonx AI, Granite Models, LangFlow, and Retrieval-Augmented Generation (RAG).",
    overview: "AdmissionMate AI is an intelligent college admission assistant designed to simplify the Maharashtra engineering admission process. Instead of manually searching multiple websites for cutoffs, fees, placements, and CAP counselling details, students receive personalized college recommendations in seconds.\n\nThe application uses IBM watsonx.ai, IBM Granite Models, LangFlow, RAG, and FAISS Vector Database to understand user requirements, retrieve verified admission information, and generate accurate recommendations based on MHT-CET percentile, category, preferred branch, and location.",
    problem: [
      "Admission data is scattered across multiple websites.",
      "Difficult to compare colleges, branches, fees, and placements.",
      "No personalized recommendation system.",
      "CAP preference list creation is confusing.",
      "Manual research consumes hours.",
      "Students struggle to identify Dream, Moderate, and Safe colleges."
    ],
    solution: [
      "Understands student profiles to retrieve verified admission information.",
      "Generates personalized college recommendations instantly.",
      "Predicts Dream, Moderate, and Safe colleges.",
      "Creates AI-powered CAP Preference Lists.",
      "Compares colleges instantly.",
      "Answers admission-related questions using AI."
    ],
    techStack: ["IBM Watsonx.ai", "IBM Granite", "LangFlow", "RAG", "FAISS", "Python", "Flask", "React"],
    features: [
      "Personalized College Recommendation System",
      "Dream, Moderate & Safe College Prediction",
      "AI Admission Chatbot powered by IBM Granite",
      "College Comparison (Cutoffs, Fees, Placements)",
      "AI CAP Preference List Generator",
      "Real-time guidance using verified RAG dataset"
    ],
    workflow: [
      "User provides CET percentile, category, branch, and city.",
      "LangFlow creates an optimized prompt.",
      "IBM Granite understands the query.",
      "RAG retrieves relevant admission information.",
      "FAISS performs semantic search.",
      "Student receives personalized colleges."
    ],
    stats: [
      "500+ Colleges",
      "50,000+ Students",
      "98% Accuracy",
      "<2s Response"
    ],
    github: "https://github.com/sohamramshette/AdmissionMate-AI",
    demo: "https://admissionmate-ai.onrender.com/",
    pdf: "/AdmissionMate-AI.pdf",
    theme: "from-blue-600/30 to-cyan-500/30",
    accent: "text-blue-500"
  },
  "traffic-light-controller": {
    title: "Traffic Light Controller",
    tagline: "A low-cost hardware-based digital traffic signal controller built using sequential logic without any microcontroller.",
    overview: "The Traffic Light Controller is a Digital Electronics project developed to demonstrate sequential logic using the CD4017 Decade Counter IC. The circuit automatically controls Red, Yellow, and Green LEDs in a cyclic sequence, simulating a real-world traffic signal system.\n\nUnlike modern traffic systems that rely on microcontrollers, this project is entirely hardware-based and uses only digital ICs, LEDs, resistors, diodes, a push button, and a battery. It provides an excellent understanding of sequential circuits, digital counters, clock pulses, and logic design.",
    problem: [
      "Design a low-cost Traffic Light Controller using CD4017 Decade Counter IC.",
      "Hardware-only implementation with no software programming.",
      "Automatic cyclic operation (Red → Yellow → Green).",
      "Low-cost design (under ₹150).",
      "Suitable for educational purposes."
    ],
    solution: [
      "Mounted CD4017 Decade Counter on breadboard.",
      "Connected push button to Clock Pin to generate pulses.",
      "Wired Q1 to Red, Q2 to Yellow, Q3 to Green LEDs.",
      "Connected Q4 to Reset pin for automatic cyclic looping.",
      "Successfully achieved stable digital logic sequence."
    ],
    techStack: ["Digital Electronics", "CD4017", "Breadboard", "Tinkercad", "Boolean Algebra"],
    features: [
      "Automatic Signal Sequencing (Red → Yellow → Green)",
      "100% Hardware Only (No Microcontrollers)",
      "Low Cost Components (Under ₹150)",
      "Educational Project (Sequential Logic)",
      "Stable Digital Logic Operation"
    ],
    workflow: [
      "Power is supplied to the CD4017 IC.",
      "Push button press generates one clock pulse.",
      "CD4017 advances its output.",
      "Q1 → Red LED ON, Q2 → Yellow LED ON, Q3 → Green LED ON",
      "Q4 resets the counter.",
      "Cycle repeats continuously."
    ],
    stats: [
      "100% Hardware",
      "0 Lines of Code",
      "<₹150 Cost",
      "3-Step Sequence"
    ],
    github: "",
    demo: "",
    pdf: "/Traffic-Light-Controller.pdf",
    poster: "/Traffic-Light-Controller-Poster.png",
    team: [
      { name: "Soham Ramshette", role: "Circuit Design & Assembly" },
      { name: "Siddhi Dhokale", role: "Wiring & Presentation" },
      { name: "Dr. Vrushali Waghmare", role: "Guide" }
    ],
    theme: "from-emerald-500/30 to-teal-500/30",
    accent: "text-emerald-500"
  },
  "blockchain-e-voting-system": {
    title: "Blockchain E-Voting System",
    tagline: "A Secure, Transparent and Tamper-Detectable Electronic Voting Platform Powered by Blockchain Technology.",
    overview: "The Blockchain E-Voting System is a web-based voting application designed to demonstrate secure, transparent, and tamper-detectable electronic voting using blockchain principles.\n\nThe system enables voter registration, voter authentication, secure vote casting, blockchain-based vote storage, live result visualization, blockchain explorer, and security validation.\n\nEach vote is stored as a separate blockchain block linked using SHA-256 hashing and Previous Hash Linking. Every block is mined using a lightweight Proof-of-Work algorithm before being added to the blockchain, making vote tampering immediately detectable.",
    problem: [
      "Centralized databases can be modified.",
      "Vote tampering is difficult to detect.",
      "Duplicate voting can occur.",
      "Lack of transparency and limited auditability.",
      "Trust issues during elections."
    ],
    solution: [
      "Registers eligible voters and authenticates them securely.",
      "Stores every vote inside an immutable blockchain block.",
      "Prevents duplicate voting.",
      "Uses SHA-256 hashing and Proof of Work mining.",
      "Maintains Previous Hash Linking to detect any tampering.",
      "Displays transparent election results."
    ],
    techStack: ["Python", "Flask", "HTML/CSS/JS", "SHA-256", "Proof of Work", "REST APIs"],
    features: [
      "Secure Voter Registration & Authentication",
      "Blockchain Vote Storage (Immutable Blocks)",
      "SHA-256 Encryption & Proof of Work Mining",
      "Double Vote Prevention",
      "Live Result Dashboard",
      "Instant Tamper Detection"
    ],
    workflow: [
      "User Registration & Authentication",
      "Voting Phase & Candidate Selection",
      "Create Vote Block",
      "SHA-256 Hash Generation",
      "Proof of Work Mining",
      "Append Block to Blockchain",
      "Update Results & Validate"
    ],
    stats: [
      "100% Secure",
      "Tamper-Proof",
      "SHA-256 Hash",
      "PoW Mining"
    ],
    github: "https://github.com/sohamramshette/Blockchain-E-Voting-System",
    demo: "https://blockchain-e-voting-system-ryuz.onrender.com/",
    pdf: "/Blockchain-E-Voting-System.pdf",
    team: [
      { name: "Kunal Patil", role: "Team Member" },
      { name: "Anuj Kadlag", role: "Team Member" },
      { name: "Soham Ramshette", role: "Team Member" },
      { name: "Prashant Girhe", role: "Team Member" },
      { name: "Pratik Wahule", role: "Team Member" },
      { name: "Prof. Pragati Deole", role: "Guide" }
    ],
    theme: "from-indigo-600/30 to-purple-600/30",
    accent: "text-indigo-400"
  }
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const project = projectDB[resolvedParams.slug]
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50])
  
  // Fallback for projects not fully populated yet
  const title = project?.title || resolvedParams.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  const defaultTheme = "from-primary/20 to-secondary/20"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      <CustomCursor />
      <AuroraBackground>
        <Navbar />
        
        <main className="relative z-10 w-full min-h-screen pt-32 pb-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link href="/#projects" className="inline-flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors mb-12 focus-visible:ring-2 focus-visible:ring-primary outline-none group rounded-full px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold tracking-wide text-sm">Back to Projects</span>
              </Link>
            </motion.div>

            <motion.div
              style={{ opacity: headerOpacity, y: headerY }}
              className="mb-16"
            >
              <span className={`inline-block font-bold tracking-[0.2em] uppercase text-xs mb-6 px-3 py-1 rounded-full border border-current ${project?.accent || 'text-primary'}`}>Case Study</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">{title}</h1>
              
              {project?.tagline && (
                <p className="text-xl md:text-3xl text-foreground/70 font-medium leading-relaxed max-w-4xl">
                  {project.tagline}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Cinematic Hero Graphic */}
              <div className={`w-full h-[400px] md:h-[600px] rounded-[3rem] glass-panel relative overflow-hidden mb-24 flex flex-col items-center justify-center bg-gradient-to-br ${project?.theme || defaultTheme} border border-white/20 dark:border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.4)]`}>
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]"></div>
                
                {/* Floating Orbs */}
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/20 dark:bg-white/10 backdrop-blur-[100px] rounded-full rotate-45 blur-[80px] animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-black/10 dark:bg-black/40 backdrop-blur-[100px] rounded-full blur-[80px] animate-[spin_15s_linear_infinite_reverse]"></div>
                
                <motion.h2 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="text-7xl md:text-9xl font-black text-white/40 dark:text-white/20 mix-blend-overlay drop-shadow-2xl z-10 text-center px-4 tracking-tighter"
                >
                  {title.split(' ')[0]}
                </motion.h2>
                
                <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-2 justify-center z-20">
                  {(project?.techStack || ["Python", "Web"]).map((tech: string, i: number) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-bold text-white tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project ? (
                <div className="space-y-32">
                  
                  {/* Overview Section */}
                  <section className="relative">
                    <div className="absolute -left-4 md:-left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 to-transparent"></div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                        <FileText size={24} />
                      </div>
                      <h2 className="text-4xl font-black tracking-tight">Project Overview</h2>
                    </div>
                    <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium whitespace-pre-wrap ml-0 md:ml-16">
                      {project.overview}
                    </p>
                  </section>

                  {/* Problem / Solution Grid */}
                  <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass-panel p-10 md:p-14 rounded-[3rem] border-t border-l border-white/20 dark:border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-32 bg-red-500/10 rounded-full blur-[100px] -mr-16 -mt-16 group-hover:bg-red-500/20 transition-colors duration-700"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                            <Target size={24} />
                          </div>
                          <h3 className="text-3xl font-bold">The Problem</h3>
                        </div>
                        <ul className="space-y-5">
                          {project.problem.map((item: string, i: number) => (
                            <li key={i} className="flex gap-4 text-lg text-foreground/80 font-medium">
                              <span className="text-red-500 mt-1 flex-shrink-0">✕</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="glass-panel p-10 md:p-14 rounded-[3rem] border-t border-l border-white/20 dark:border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-[100px] -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-colors duration-700"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <CheckCircle2 size={24} />
                          </div>
                          <h3 className="text-3xl font-bold">The Solution</h3>
                        </div>
                        <ul className="space-y-5">
                          {project.solution.map((item: string, i: number) => (
                            <li key={i} className="flex gap-4 text-lg text-foreground/80 font-medium">
                              <span className="text-emerald-500 mt-1 flex-shrink-0">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Core Features */}
                  <section className="glass-panel p-10 md:p-16 rounded-[3rem] border-white/20 dark:border-white/5 relative overflow-hidden">
                    <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-500">
                          <Zap size={24} />
                        </div>
                        <h3 className="text-4xl font-black tracking-tight">Core Features</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {project.features.map((feature: string, i: number) => (
                          <div key={i} className="bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 dark:border-white/5 font-semibold text-lg text-foreground/90 transition-colors shadow-sm flex items-start gap-4 group">
                            <span className="text-primary opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0">0{i+1}.</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Workflow */}
                  {project.workflow && (
                    <section className="relative pt-16">
                      <div className="text-center mb-16">
                        <h3 className="text-4xl font-black tracking-tight inline-flex items-center gap-4">
                          <LayoutTemplate className="text-primary" size={32} />
                          Architecture & Workflow
                        </h3>
                      </div>
                      
                      <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent"></div>
                        
                        <div className="space-y-12">
                          {project.workflow.map((step: string, i: number) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-10%" }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              className="flex items-center gap-8 relative z-10"
                            >
                              <div className="w-14 h-14 rounded-full bg-background border-[3px] border-primary flex items-center justify-center font-bold text-xl text-primary shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                {i + 1}
                              </div>
                              <div className="glass-panel p-6 rounded-2xl border-white/20 dark:border-white/5 font-medium text-lg text-foreground/90 w-full hover:-translate-y-1 transition-transform shadow-md">
                                {step}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Project Stats */}
                  {project.stats && (
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {project.stats.map((stat: string, i: number) => {
                        const value = stat.split(' ')[0]
                        const label = stat.substring(stat.indexOf(' ') + 1)
                        return (
                          <div key={i} className="text-center p-8 glass-panel rounded-[2rem] border-white/20 dark:border-white/5 hover:-translate-y-2 transition-transform duration-500">
                            <p className={`font-black text-4xl md:text-5xl mb-2 ${project?.accent || 'text-primary'}`}>{value}</p>
                            <p className="text-sm uppercase tracking-widest text-foreground/60 font-bold">{label}</p>
                          </div>
                        )
                      })}
                    </section>
                  )}

                </div>
              ) : (
                <div className="glass-panel p-16 rounded-[3rem] text-center">
                  <p className="text-2xl text-foreground/60 font-medium">Case study details are currently being updated.</p>
                </div>
              )}
              
              {/* Project Links / Footer */}
              <div className="mt-32 pt-16 border-t border-white/10 flex flex-col items-center text-center">
                <h3 className="text-3xl font-black mb-10">Explore the Project</h3>
                
                <div className="flex flex-wrap justify-center gap-6">
                  {(project?.github || project?.demo || project?.pdf || project?.poster) ? (
                    <>
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer" className="px-10 py-5 rounded-full bg-primary text-white font-bold hover:bg-secondary transition-all shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.6)] flex items-center space-x-3 group text-lg hover:-translate-y-1">
                          <ExternalLink size={24} className="group-hover:rotate-12 transition-transform" />
                          <span>View Live Demo</span>
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="px-10 py-5 rounded-full glass-panel hover:bg-white/10 font-bold transition-all flex items-center space-x-3 text-lg hover:-translate-y-1">
                          <Github size={24} className="group-hover:scale-110 transition-transform" />
                          <span>Source Code</span>
                        </a>
                      )}
                      {project.pdf && (
                        <a href={project.pdf} target="_blank" rel="noreferrer" className="px-10 py-5 rounded-full glass-panel hover:bg-white/10 font-bold transition-all flex items-center space-x-3 text-lg hover:-translate-y-1 text-blue-400">
                          <FileText size={24} className="group-hover:-translate-y-1 transition-transform" />
                          <span>View Document</span>
                        </a>
                      )}
                      {project.poster && (
                        <a href={project.poster} target="_blank" rel="noreferrer" className="px-10 py-5 rounded-full glass-panel hover:bg-white/10 font-bold transition-all flex items-center space-x-3 text-lg hover:-translate-y-1 text-purple-400">
                          <ImageIcon size={24} className="group-hover:scale-110 transition-transform" />
                          <span>View Poster</span>
                        </a>
                      )}
                    </>
                  ) : (
                     <span className="px-8 py-4 rounded-full bg-white/5 text-foreground/40 font-medium">
                       Links unavailable
                     </span>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        </main>
        
        <Footer />
      </AuroraBackground>
    </>
  )
}
