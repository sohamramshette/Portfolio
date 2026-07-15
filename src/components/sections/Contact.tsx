"use client"

import { useState, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Mail, MapPin, Send, ArrowRight } from "lucide-react"
import { FaGithub as Github, FaLinkedin as Linkedin, FaWhatsapp as Whatsapp, FaInstagram as Instagram } from "react-icons/fa"
import { Section } from "@/components/layout/Section"
import { staggerContainer, smoothTween } from "@/lib/motion"

export function Contact() {
  const shouldReduceMotion = useReducedMotion()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  
  const formRef = useRef<HTMLFormElement>(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })

  const handleMouseMove = (e: React.MouseEvent<HTMLFormElement>) => {
    if (!formRef.current) return
    const rect = formRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thanks for reaching out! (This is a frontend demo)")
    setFormData({ name: "", email: "", message: "" })
    setFocusedInput(null)
  }

  return (
    <Section 
      id="contact" 
      title={<>Let's <span className="text-gradient">Connect</span></>}
      subtitle="Currently open for opportunities, collaborations, or just a friendly chat."
    >
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch"
        variants={shouldReduceMotion ? {} : staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
      >
        
        {/* Contact Info */}
        <motion.div
          variants={shouldReduceMotion ? {} : {
            hidden: { opacity: 0, x: -30 },
            show: { opacity: 1, x: 0, transition: smoothTween }
          }}
          className="lg:col-span-2 flex flex-col h-full"
        >
          <div className="glass-panel p-10 md:p-12 rounded-[2.5rem] relative overflow-hidden group flex-grow flex flex-col justify-between border-t border-l border-white/20 dark:border-white/5">
            <div className="absolute top-0 right-0 p-40 bg-primary/10 rounded-full blur-[100px] -mr-20 -mt-20 group-hover:bg-primary/20 transition-colors duration-1000 pointer-events-none"></div>
            
            <div className="relative z-10 mb-16">
              <h3 className="text-4xl font-black mb-4 tracking-tight text-foreground">Contact <br />Details</h3>
              <p className="text-foreground/60 font-medium text-lg leading-relaxed">Let's build something incredible together.</p>
            </div>
            
            <div className="space-y-6 relative z-10 mb-16">
              <ContactLink 
                href="mailto:sohamramshette2007@gmail.com"
                icon={<Mail size={24} />}
                label="Email"
                value="sohamramshette2007@gmail.com"
                hoverColor="text-blue-500"
              />
              <ContactLink 
                href="https://wa.me/918855042211"
                icon={<Whatsapp size={24} />}
                label="WhatsApp"
                value="+91 8855042211"
                hoverColor="text-[#25D366]"
                target="_blank"
              />
              <div className="flex items-center space-x-6 p-4 -ml-4 rounded-2xl group/item cursor-default">
                <div className="p-4 bg-white/5 border border-white/10 dark:border-white/5 rounded-2xl text-secondary shadow-inner"><MapPin size={24} /></div>
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold mb-1">Location</p>
                  <p className="text-lg font-semibold text-foreground/90">Latur, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 dark:border-white/5 relative z-10">
              <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-6">Social Profiles</p>
              <div className="flex space-x-3">
                <SocialLink href="https://github.com/SohamRamshette" icon={<Github size={22} />} hoverColor="group-hover/social:text-foreground" />
                <SocialLink href="https://www.linkedin.com/in/soham-ramshette-23096a383/" icon={<Linkedin size={22} />} hoverColor="group-hover/social:text-[#0A66C2]" />
                <SocialLink href="https://instagram.com/Soham_Ramshette" icon={<Instagram size={22} />} hoverColor="group-hover/social:text-[#E1306C]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={shouldReduceMotion ? {} : {
            hidden: { opacity: 0, x: 30 },
            show: { opacity: 1, x: 0, transition: smoothTween }
          }}
          className="lg:col-span-3 flex flex-col h-full"
        >
          <form 
            ref={formRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onSubmit={handleSubmit} 
            className="glass-panel p-10 md:p-12 rounded-[2.5rem] h-full flex flex-col justify-between relative overflow-hidden group/form border-t border-l border-white/20 dark:border-white/5"
          >
            {/* Dynamic Cursor Light */}
            {!shouldReduceMotion && (
              <div 
                className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover/form:opacity-100 pointer-events-none mix-blend-overlay"
                style={{
                  background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 40%)`
                }}
              />
            )}

            <div className="absolute bottom-0 left-0 p-40 bg-secondary/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none z-0"></div>
            
            <div className="space-y-8 relative z-10 flex-grow">
              
              <div className="relative group/input mt-4">
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-transparent border-b-2 border-foreground/10 dark:border-white/10 px-0 py-4 text-xl text-foreground focus:outline-none focus:border-primary transition-colors font-medium peer placeholder-transparent"
                  placeholder="John Doe"
                />
                <label 
                  htmlFor="name" 
                  className={`absolute left-0 transition-all duration-300 font-bold tracking-wide pointer-events-none ${
                    focusedInput === "name" || formData.name 
                      ? "-top-6 text-xs text-primary uppercase" 
                      : "top-4 text-lg text-foreground/40"
                  }`}
                >
                  What's your name?
                </label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-0 peer-focus:w-full transition-all duration-500 ease-out"></div>
              </div>
              
              <div className="relative group/input mt-8">
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-transparent border-b-2 border-foreground/10 dark:border-white/10 px-0 py-4 text-xl text-foreground focus:outline-none focus:border-primary transition-colors font-medium peer placeholder-transparent"
                  placeholder="john@example.com"
                />
                <label 
                  htmlFor="email" 
                  className={`absolute left-0 transition-all duration-300 font-bold tracking-wide pointer-events-none ${
                    focusedInput === "email" || formData.email 
                      ? "-top-6 text-xs text-primary uppercase" 
                      : "top-4 text-lg text-foreground/40"
                  }`}
                >
                  What's your email?
                </label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-0 peer-focus:w-full transition-all duration-500 ease-out"></div>
              </div>
              
              <div className="relative group/input mt-8 flex-grow flex flex-col">
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  onFocus={() => setFocusedInput("message")}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-transparent border-b-2 border-foreground/10 dark:border-white/10 px-0 py-4 text-xl text-foreground focus:outline-none focus:border-primary transition-colors resize-none font-medium peer placeholder-transparent custom-scrollbar flex-grow min-h-[150px]"
                  placeholder="How can we help each other?"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className={`absolute left-0 transition-all duration-300 font-bold tracking-wide pointer-events-none ${
                    focusedInput === "message" || formData.message 
                      ? "-top-6 text-xs text-primary uppercase" 
                      : "top-4 text-lg text-foreground/40"
                  }`}
                >
                  Tell me about your project...
                </label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-primary w-0 peer-focus:w-full transition-all duration-500 ease-out"></div>
              </div>
            </div>

            <button
              type="submit"
              className="mt-12 w-full py-5 px-8 rounded-2xl bg-primary text-white font-black text-lg tracking-wide hover:bg-secondary transition-all duration-500 flex items-center justify-between shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-primary/50 outline-none relative z-10 group/btn"
            >
              <span>Send Message</span>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:translate-x-2 transition-transform">
                <ArrowRight size={20} />
              </div>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </Section>
  )
}

function ContactLink({ href, icon, label, value, hoverColor, target }: any) {
  return (
    <a href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined} className="flex items-center space-x-6 p-4 -ml-4 rounded-2xl group/item hover:bg-white/5 outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors">
      <div className={`p-4 bg-white/5 border border-white/10 dark:border-white/5 rounded-2xl text-foreground/70 ${hoverColor} group-hover/item:scale-110 transition-all shadow-inner`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold mb-1">{label}</p>
        <p className={`text-lg font-semibold text-foreground/90 transition-colors ${hoverColor.replace('text-', 'group-hover/item:text-')}`}>
          {value}
        </p>
      </div>
    </a>
  )
}

function SocialLink({ href, icon, hoverColor }: { href: string, icon: React.ReactNode, hoverColor: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer" 
      className="p-4 rounded-2xl bg-white/5 border border-white/10 dark:border-white/5 hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none group/social shadow-inner hover:-translate-y-1" 
    >
      <div className={`text-foreground/50 transition-colors ${hoverColor}`}>
        {icon}
      </div>
    </a>
  )
}
