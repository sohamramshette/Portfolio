"use client"

import dynamic from "next/dynamic"
import { AuroraBackground } from "@/components/ui/AuroraBackground"
import { PremiumDecorations } from "@/components/ui/PremiumDecorations"
import { CustomCursor } from "@/components/ui/CustomCursor"
import { EasterEgg } from "@/components/ui/EasterEgg"
import { Loader } from "@/components/ui/Loader"
import { SakuraPetals } from "@/components/ui/SakuraPetals"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { AboutMe } from "@/components/sections/AboutMe"
import { Education } from "@/components/sections/Education"
import { Skills } from "@/components/sections/Skills"
import { Experience } from "@/components/sections/Experience"
import { Contact } from "@/components/sections/Contact"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

const FeaturedProjects = dynamic(() => import("@/components/sections/FeaturedProjects").then(mod => mod.FeaturedProjects), { ssr: true })
const Certificates = dynamic(() => import("@/components/sections/Certificates").then(mod => mod.Certificates), { ssr: true })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <CustomCursor />
      <EasterEgg />
      
      <main className={`relative bg-background text-foreground overflow-hidden selection:bg-primary/30 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        
        {/* Background Effects */}
        <AuroraBackground>
          <PremiumDecorations />
          <div className="hidden dark:block">
            <SakuraPetals />
          </div>
          
          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            <Hero />
            <AboutMe />
            <Education />
            <Skills />
            <Experience />
            <FeaturedProjects />
            <Certificates />
            <Contact />
          </div>
          
          <Footer />
        </AuroraBackground>
      </main>
    </>
  )
}
