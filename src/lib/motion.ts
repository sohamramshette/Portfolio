// Centralized motion configurations for a premium, buttery-smooth feel

export const premiumTransition = {
  type: "spring" as const,
  stiffness: 40,
  damping: 20,
  mass: 1,
}

export const smoothTween = {
  type: "tween" as const,
  ease: [0.25, 0.1, 0.25, 1] as const,
  duration: 1.2,
}

export const fadeIn = (direction: "up" | "down" | "left" | "right" | "none" = "up", delay: number = 0) => {
  return {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        ...smoothTween,
        delay,
      },
    },
  }
}

export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }
}
