"use client"

import { motion, useReducedMotion } from "framer-motion"
import { GitCommit, GitPullRequest, GitMerge } from "lucide-react"
import { FaGithub as Github } from "react-icons/fa"
import { GitHubCalendar } from "react-github-calendar"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Section } from "@/components/layout/Section"
import { fadeIn } from "@/lib/motion"

export function GithubStats() {
  const shouldReduceMotion = useReducedMotion()
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "dark"

  const fallbackHeatmap = (
    <div className="w-full h-40 flex items-center justify-center bg-white/5 rounded-xl border border-white/10">
      <p className="text-foreground/50 text-sm flex items-center gap-2 font-medium">
        <Github size={16} />
        Contribution graph temporarily unavailable.
      </p>
    </div>
  )

  return (
    <Section 
      id="github" 
      title={<>GitHub <span className="text-gradient">Activity</span></>}
    >
      <motion.div
        variants={shouldReduceMotion ? {} : fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="glass-panel p-8 md:p-12 rounded-3xl mb-12 overflow-hidden shadow-xl"
      >
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-2xl font-bold tracking-tight text-foreground/90">Contribution Graph</h3>
          <a 
            href="https://github.com/SohamRamshette" 
            target="_blank" 
            rel="noreferrer"
            className="text-sm text-primary hover:text-primary/80 transition-colors font-bold tracking-wide focus-visible:ring-2 focus-visible:ring-primary outline-none rounded-lg px-2 py-1"
            aria-label="View SohamRamshette on GitHub"
          >
            @SohamRamshette
          </a>
        </div>
        
        <div className="overflow-x-auto pb-4 custom-scrollbar">
          <div className="min-w-max p-2">
            <ErrorBoundary fallback={fallbackHeatmap}>
              {mounted && (
                <GitHubCalendar
                  username="SohamRamshette"
                  colorScheme={currentTheme as "light" | "dark"}
                  theme={{
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                  fontSize={14}
                  blockSize={12}
                  blockMargin={6}
                />
              )}
              {!mounted && fallbackHeatmap}
            </ErrorBoundary>
          </div>
        </div>
      </motion.div>

      {/* GitHub Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <motion.div
          variants={shouldReduceMotion ? {} : fadeIn("up", 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-500 group"
        >
          <div className="p-5 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
            <GitCommit size={28} aria-hidden="true" />
          </div>
          <p className="text-4xl font-black text-foreground tracking-tighter mb-2">300+</p>
          <p className="text-xs text-foreground/60 uppercase tracking-widest font-bold">Total Commits</p>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? {} : fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-500 group"
        >
          <div className="p-5 rounded-2xl bg-secondary/10 text-secondary mb-6 group-hover:scale-110 transition-transform duration-500">
            <GitPullRequest size={28} aria-hidden="true" />
          </div>
          <p className="text-4xl font-black text-foreground tracking-tighter mb-2">15+</p>
          <p className="text-xs text-foreground/60 uppercase tracking-widest font-bold">Repositories</p>
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? {} : fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-500 group"
        >
          <div className="p-5 rounded-2xl bg-accent/10 text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
            <GitMerge size={28} aria-hidden="true" />
          </div>
          <p className="text-4xl font-black text-foreground tracking-tighter mb-2">Active</p>
          <p className="text-xs text-foreground/60 uppercase tracking-widest font-bold">Contributions</p>
        </motion.div>
      </div>
    </Section>
  )
}
