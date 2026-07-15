"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode
}

export const AuroraBackground = ({
  className,
  children,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background text-foreground transition-colors duration-700">
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* DARK MODE AURORA */}
        <div
          className={cn(
            "hidden dark:block filter blur-[10px] pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform",
            "[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]",
            "[--aurora:repeating-linear-gradient(100deg,var(--color-primary)_10%,var(--color-secondary)_15%,var(--color-accent)_20%,var(--color-primary)_25%,var(--color-secondary)_30%)]",
            "[background-image:var(--dark-gradient),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "animate-aurora",
            "after:content-[''] after:absolute after:inset-0",
            "after:[background-image:var(--dark-gradient),var(--aurora)]",
            "after:[background-size:200%,_100%]",
            "after:animate-aurora after:[animation-duration:120s]",
            "after:mix-blend-difference"
          )}
        ></div>

        {/* LIGHT MODE GRADIENT MESH */}
        <div className="block dark:hidden absolute inset-0 overflow-hidden pointer-events-none opacity-80 mix-blend-multiply">
          {/* Soft sunlight bloom (Top Right) */}
          <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#FFD180] mix-blend-multiply filter blur-[120px] animate-mesh-1 opacity-40"></div>
          
          {/* Blue ambient reflection (Bottom Left) */}
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#DBEAFE] mix-blend-multiply filter blur-[120px] animate-mesh-2 opacity-80"></div>
          
          {/* Soft primary glow (Center) */}
          <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#E0F2FE] mix-blend-multiply filter blur-[100px] animate-mesh-3 opacity-60"></div>
        </div>

        {/* Global Overlay (Texture & Dimming) */}
        <div className="absolute inset-0 bg-background/50 backdrop-blur-[10px] dark:bg-background/80 transition-colors duration-700" />
      </div>
      <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
    </main>
  )
}
