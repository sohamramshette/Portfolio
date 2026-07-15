"use client"

import { Mail, ArrowUp } from "lucide-react"
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram } from "react-icons/fa"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 pt-20 pb-10 mt-20 border-t border-white/10 dark:border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Soham Ramshette</h2>
            <p className="text-lg text-foreground/60 font-medium max-w-md">Building digital experiences that combine stunning design with robust engineering.</p>
          </div>
          
          <button
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all duration-300 focus-visible:ring-4 focus-visible:ring-primary/50 outline-none group"
            aria-label="Back to top"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8 border-t border-white/10 dark:border-white/5">
          
          <p className="text-sm text-foreground/50 font-semibold tracking-wide text-center md:text-left">
            &copy; {currentYear} Soham Ramshette. <span className="hidden sm:inline">All rights reserved.</span>
          </p>

          <div className="flex items-center justify-center md:justify-end space-x-6">
            <SocialLink href="https://github.com/SohamRamshette" icon={<Github size={20} />} ariaLabel="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/soham-ramshette-23096a383/" icon={<Linkedin size={20} />} ariaLabel="LinkedIn" />
            <SocialLink href="https://instagram.com/Soham_Ramshette" icon={<Instagram size={20} />} ariaLabel="Instagram" />
            <SocialLink href="mailto:sohamramshette2007@gmail.com" icon={<Mail size={20} />} ariaLabel="Email" />
          </div>
          
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, ariaLabel }: { href: string, icon: React.ReactNode, ariaLabel: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none hover:-translate-y-1"
      aria-label={ariaLabel}
    >
      {icon}
    </a>
  )
}
