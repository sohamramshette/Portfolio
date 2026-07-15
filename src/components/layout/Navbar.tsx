"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "900"], style: ["italic", "normal"] })

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // Improved scroll spy
  useEffect(() => {
    const handleScroll = () => {
      // Find the section that is currently most visible
      const sectionElements = navItems.map(item => ({
        id: item.href.substring(1),
        element: document.getElementById(item.href.substring(1))
      })).filter(s => s.element !== null)

      let currentActive = "home"
      for (const { id, element } of sectionElements) {
        if (!element) continue
        const rect = element.getBoundingClientRect()
        // If the top of the section is within the top 40% of the screen, it's active
        if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
          currentActive = id
          break
        }
      }
      
      if (currentActive !== activeSection) {
        setActiveSection(currentActive)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Initial check
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "py-2" : "py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 bg-white/40 dark:bg-black/20 backdrop-blur-[30px] border border-blue-600/10 dark:border-white/10 shadow-[0_10px_40px_rgba(37,99,235,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <a href="#home" className={`text-xl md:text-2xl font-normal tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 hover:scale-105 duration-300 ${playfair.className} text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-sky-400 dark:from-blue-600 dark:via-blue-400 dark:to-cyan-300 hover:opacity-80 transition-opacity`}>
            AutoGraph !!
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary z-10 ${
                    isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-primary/10 dark:bg-primary/20 border border-primary/20 rounded-full -z-10 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              )
            })}
          </nav>

          <div className="flex items-center space-x-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden absolute top-full left-4 right-4 mt-2 p-4 glass rounded-2xl flex flex-col space-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeSection === item.href.substring(1)
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-white/5 text-foreground/80"
              }`}
            >
              {item.name}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}
