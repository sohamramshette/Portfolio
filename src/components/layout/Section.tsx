"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"
import { fadeIn } from "@/lib/motion"

interface SectionProps {
  id: string
  title?: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  className?: string
  noPadding?: boolean
}

export function Section({ id, title, subtitle, children, className = "", noPadding = false }: SectionProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id={id} className={`relative z-10 w-full ${noPadding ? "" : "py-32"} ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {title && (
          <motion.div
            variants={shouldReduceMotion ? {} : fadeIn("up")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
              {title}
            </h2>
            {subtitle && (
              <div className="text-lg text-foreground/70 max-w-2xl mx-auto">
                {subtitle}
              </div>
            )}
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6 opacity-80"></div>
          </motion.div>
        )}
        
        {children}
      </div>
    </section>
  )
}
