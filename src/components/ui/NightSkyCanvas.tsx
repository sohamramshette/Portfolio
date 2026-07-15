"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

interface NightSkyCanvasProps {
  isWarping: boolean
}

// ----------------------------------------------------
// UTILS
// ----------------------------------------------------
// Central 45% of the screen is strictly safe
function isSafeZone(x: number, y: number, w: number, h: number) {
  const safeW = w * 0.45
  const safeH = h * 0.45
  const cx = w / 2
  const cy = h / 2
  return x > cx - safeW/2 && x < cx + safeW/2 && y > cy - safeH/2 && y < cy + safeH/2
}

// Ensure spawning is strictly outside the viewport
function getSpawnCoordinates(w: number, h: number, size: number) {
  const edge = Math.floor(Math.random() * 4)
  if (edge === 0) return { x: Math.random() * w, y: -size } // Top
  if (edge === 1) return { x: w + size, y: Math.random() * h } // Right
  if (edge === 2) return { x: Math.random() * w, y: h + size } // Bottom
  return { x: -size, y: Math.random() * h } // Left
}

// ----------------------------------------------------
// CLASSES
// ----------------------------------------------------
class Star {
  x: number; y: number; z: number; size: number; color: string; alpha: number; twinkleSpeed: number; isLarge: boolean
  constructor(w: number, h: number) {
    this.x = Math.random() * w - w / 2
    this.y = Math.random() * h - h / 2
    this.z = Math.random() * 1000
    this.isLarge = Math.random() > 0.95
    this.size = this.isLarge ? Math.random() * 2 + 1 : Math.random() * 1.2 + 0.1
    this.alpha = Math.random()
    this.twinkleSpeed = this.isLarge ? Math.random() * 0.01 + 0.005 : Math.random() * 0.03 + 0.01
    
    const rand = Math.random()
    if (rand < 0.6) this.color = "255, 255, 255"
    else if (rand < 0.8) this.color = "180, 220, 255"
    else if (rand < 0.95) this.color = "255, 240, 180"
    else this.color = "255, 210, 150"
  }
  update(isWarping: boolean, warpMultiplier: number, w: number, h: number) {
    if (isWarping) {
      this.z -= warpMultiplier
      if (this.z < 1) {
        this.z = 1000
        this.x = Math.random() * w - w / 2
        this.y = Math.random() * h - h / 2
      }
    } else {
      this.alpha += this.twinkleSpeed
      if (this.alpha > 0.9 || this.alpha < 0.1) this.twinkleSpeed *= -1
    }
  }
  draw(ctx: CanvasRenderingContext2D, w: number, h: number, isWarping: boolean) {
    const cx = w / 2; const cy = h / 2
    const px = (this.x / this.z) * 1000 + cx
    const py = (this.y / this.z) * 1000 + cy
    const s = Math.max(0.1, this.size * (1000 / this.z))
    
    if (px < 0 || px > w || py < 0 || py > h) return

    if (isWarping) {
      const ppx = (this.x / (this.z + 50)) * 1000 + cx
      const ppy = (this.y / (this.z + 50)) * 1000 + cy
      ctx.beginPath()
      ctx.strokeStyle = `rgba(${this.color}, ${Math.min(1, this.alpha * 2)})`
      ctx.lineWidth = s
      ctx.moveTo(ppx, ppy)
      ctx.lineTo(px, py)
      ctx.stroke()
    } else {
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`
      ctx.beginPath()
      ctx.arc(px, py, s, 0, Math.PI * 2)
      ctx.fill()
      if (this.isLarge) {
        const grad = ctx.createRadialGradient(px, py, 0, px, py, s * 3)
        grad.addColorStop(0, `rgba(${this.color}, ${this.alpha * 0.5})`)
        grad.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, s * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
}

class DustParticle {
  x: number; y: number; size: number; speedX: number; speedY: number; opacity: number
  constructor(w: number, h: number) {
    // Keep space dust out of the safe zone on spawn
    do {
      this.x = Math.random() * w
      this.y = Math.random() * h
    } while (isSafeZone(this.x, this.y, w, h))

    this.size = Math.random() * 2 + 1
    this.speedX = (Math.random() - 0.5) * 0.3
    this.speedY = (Math.random() - 0.5) * 0.3
    this.opacity = Math.random() * 0.3 + 0.1
  }
  update(isWarping: boolean, warpMultiplier: number, w: number, h: number) {
    if (isWarping) {
      const cx = w / 2; const cy = h / 2
      const dist = Math.sqrt((this.x-cx)**2 + (this.y-cy)**2) || 1
      this.x += ((this.x-cx) / dist) * warpMultiplier
      this.y += ((this.y-cy) / dist) * warpMultiplier
    } else {
      this.x += this.speedX; this.y += this.speedY
    }
    if (this.x < 0) this.x = w; if (this.x > w) this.x = 0
    if (this.y < 0) this.y = h; if (this.y > h) this.y = 0
  }
  draw(ctx: CanvasRenderingContext2D, w: number, h: number, isWarping: boolean) {
    if (isSafeZone(this.x, this.y, w, h)) return // Strictly hide in safe zone
    ctx.fillStyle = `rgba(100, 150, 255, ${isWarping ? this.opacity * 0.2 : this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

class Meteor {
  x: number; y: number; speedX: number; speedY: number; length: number; opacity: number
  color: string; active: boolean; isExploding: boolean; isComet: boolean; particles: {x:number, y:number, vx:number, vy:number, life:number}[]
  
  constructor(w: number, h: number) {
    this.active = true
    this.isComet = Math.random() > 0.98 // rare comet
    this.isExploding = false
    this.particles = []
    
    // Spawn strictly outside viewport
    const coords = getSpawnCoordinates(w, h, 200)
    this.x = coords.x
    this.y = coords.y
    
    // Aim loosely across the screen, not necessarily at the center
    const targetX = w/2 + (Math.random() - 0.5) * w
    const targetY = h/2 + (Math.random() - 0.5) * h
    const angle = Math.atan2(targetY - this.y, targetX - this.x)
    
    const speed = this.isComet ? Math.random() * 5 + 2 : Math.random() * 20 + 10
    
    this.speedX = Math.cos(angle) * speed
    this.speedY = Math.sin(angle) * speed
    
    this.length = this.isComet ? 600 : Math.random() * 200 + 50
    this.opacity = 1
    
    const rand = Math.random()
    if (rand < 0.5) this.color = "255, 255, 255"
    else if (rand < 0.8) this.color = "150, 200, 255" // blue
    else this.color = "255, 150, 50" // orange
  }
  
  update(w: number, h: number) {
    if (this.isExploding) {
      this.particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.life -= 0.02 })
      this.particles = this.particles.filter(p => p.life > 0)
      if (this.particles.length === 0) this.active = false
      return
    }

    this.x += this.speedX
    this.y += this.speedY
    this.opacity -= this.isComet ? 0.001 : 0.015

    // Despawn logic
    if (this.opacity <= 0 || this.y > h + 200 || this.x < -200 || this.x > w + 200) {
      if (Math.random() > 0.95 && !this.isComet && this.opacity > 0.5 && !isSafeZone(this.x, this.y, w, h)) {
        this.isExploding = true
        for (let i = 0; i < 20; i++) {
          this.particles.push({
            x: this.x, y: this.y,
            vx: (Math.random() - 0.5) * 5 + this.speedX * 0.2,
            vy: (Math.random() - 0.5) * 5 + this.speedY * 0.2,
            life: 1
          })
        }
      } else {
        this.active = false
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D, w: number, h: number) {
    if (isSafeZone(this.x, this.y, w, h)) return // Strictly hide in safe zone

    if (this.isExploding) {
      ctx.fillStyle = `rgba(${this.color}, 1)`
      this.particles.forEach(p => {
        if (!isSafeZone(p.x, p.y, w, h)) {
          ctx.globalAlpha = p.life
          ctx.beginPath()
          ctx.arc(p.x, p.y, Math.random() * 2 + 1, 0, Math.PI*2)
          ctx.fill()
        }
      })
      ctx.globalAlpha = 1
      return
    }

    ctx.save()
    const grad = ctx.createLinearGradient(this.x, this.y, this.x - this.speedX * (this.length/10), this.y - this.speedY * (this.length/10))
    grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
    grad.addColorStop(0.2, `rgba(${this.color}, ${this.opacity * 0.8})`)
    grad.addColorStop(1, "rgba(0, 0, 0, 0)")
    
    ctx.strokeStyle = grad
    ctx.lineWidth = this.isComet ? 4 : 2
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x - this.speedX * (this.length/10), this.y - this.speedY * (this.length/10))
    ctx.stroke()
    
    ctx.beginPath()
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.arc(this.x, this.y, this.isComet ? 4 : 2, 0, Math.PI*2)
    ctx.fill()
    ctx.restore()
  }
}

class Asteroid {
  x: number; y: number; size: number; speedX: number; speedY: number; 
  rotation: number; rotSpeed: number; imgIndex: number; active: boolean; depthLayer: number
  
  constructor(w: number, h: number) {
    this.active = true
    
    // 3 Distinct layers: 0 = background, 1 = middle, 2 = foreground
    this.depthLayer = Math.floor(Math.random() * 3) 
    
    if (this.depthLayer === 0) { // Background: Tiny, Slow, Dark
      this.size = Math.random() * 20 + 10
    } else if (this.depthLayer === 1) { // Middle: Medium, Normal speed
      this.size = Math.random() * 40 + 30
    } else { // Foreground: Large, Fast, Blurred
      this.size = Math.random() * 80 + 70
    }
    
    const speed = (this.depthLayer + 1) * (Math.random() * 0.5 + 0.2)
    
    // Spawn strictly outside viewport
    const coords = getSpawnCoordinates(w, h, this.size)
    this.x = coords.x
    this.y = coords.y

    // Aim strictly away from the center (or across the edges) to avoid cluttering safe zone
    const targetX = w/2 + (Math.random() - 0.5) * w * 1.5
    const targetY = h/2 + (Math.random() - 0.5) * h * 1.5
    const angle = Math.atan2(targetY - this.y, targetX - this.x)

    this.speedX = Math.cos(angle) * speed
    this.speedY = Math.sin(angle) * speed
    
    this.rotation = Math.random() * Math.PI * 2
    this.rotSpeed = (Math.random() - 0.5) * 0.02
    
    // Randomize among uploaded images (1-12)
    this.imgIndex = Math.floor(Math.random() * 12) + 1 
  }

  update(w: number, h: number, isWarping: boolean) {
    if (isWarping) {
      this.x += this.speedX * 10
      this.y += this.speedY * 10
    } else {
      this.x += this.speedX
      this.y += this.speedY
    }
    this.rotation += this.rotSpeed

    // Despawn if far off screen
    if (this.x < -this.size * 3 || this.x > w + this.size * 3 || this.y < -this.size * 3 || this.y > h + this.size * 3) {
      this.active = false
    }
  }

  draw(ctx: CanvasRenderingContext2D, images: HTMLImageElement[], w: number, h: number, isWarping: boolean) {
    if (isSafeZone(this.x, this.y, w, h)) return // Strictly hide in safe zone

    const img = images[this.imgIndex - 1]
    
    // Only draw if image is successfully loaded (NO CSS fallback circles)
    if (img && img.complete && img.naturalHeight !== 0) {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.rotation)
      
      // Depth layer physics
      if (this.depthLayer === 2) ctx.filter = isWarping ? "blur(10px)" : "blur(3px)" // Foreground
      else if (this.depthLayer === 0) ctx.globalAlpha = 0.4 // Background
      
      if (isWarping) {
        ctx.scale(1, 5)
        ctx.globalAlpha = 0.5
      }

      ctx.drawImage(img, -this.size/2, -this.size/2, this.size, this.size)
      ctx.restore()
    }
  }
}

// ----------------------------------------------------
// COMPONENT
// ----------------------------------------------------
export function NightSkyCanvas({ isWarping }: NightSkyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const warpSpeedMultiplier = useRef(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Preload Asteroid Images (user is uploading 8-12 images)
    const asteroidImages: HTMLImageElement[] = []
    for (let i = 1; i <= 12; i++) {
      const img = new Image()
      img.src = `/asteroid-${i}.png` // assuming PNGs for transparency
      
      // Fallback to webp if they upload webp
      img.onerror = () => { img.src = `/asteroid-${i}.webp` }
      
      asteroidImages.push(img)
    }

    let animationFrameId: number
    let stars: Star[] = []
    let dust: DustParticle[] = []
    let meteors: Meteor[] = []
    let asteroids: Asteroid[] = []
    
    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      stars = []
      dust = []
      const numStars = Math.floor((canvas.width * canvas.height) / 500)
      for (let i = 0; i < numStars; i++) stars.push(new Star(canvas.width, canvas.height))
      
      const numDust = Math.floor((canvas.width * canvas.height) / 2000)
      for (let i = 0; i < numDust; i++) dust.push(new DustParticle(canvas.width, canvas.height))
      
      asteroids = []
      // Do NOT spawn asteroids initially in the center. Let them slowly drift in naturally.
    }

    init()
    
    let lastMeteorTime = 0
    let nextMeteorDelay = 1000

    const render = (time: number) => {
      if (isWarping) {
        warpSpeedMultiplier.current = Math.min(warpSpeedMultiplier.current + 2, 50)
        ctx.fillStyle = "rgba(1, 2, 4, 0.25)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        warpSpeedMultiplier.current = 1
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      
      stars.forEach(star => {
        if (!shouldReduceMotion) star.update(isWarping, warpSpeedMultiplier.current, canvas.width, canvas.height)
        star.draw(ctx, canvas.width, canvas.height, isWarping)
      })

      if (!shouldReduceMotion) {
        // High frequency meteors
        if (time - lastMeteorTime > nextMeteorDelay) {
          const count = Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 1
          for (let i = 0; i < count; i++) meteors.push(new Meteor(canvas.width, canvas.height))
          lastMeteorTime = time
          nextMeteorDelay = Math.random() * 3000 + 1000
        }
        meteors.forEach(m => { m.update(canvas.width, canvas.height); m.draw(ctx, canvas.width, canvas.height) })
        meteors = meteors.filter(m => m.active)

        // Strict limit of 6-8 maximum visible asteroids
        if (asteroids.length < 8 && Math.random() > 0.98) {
          asteroids.push(new Asteroid(canvas.width, canvas.height))
        }
        
        asteroids.sort((a, b) => a.depthLayer - b.depthLayer).forEach(ast => {
          ast.update(canvas.width, canvas.height, isWarping)
          ast.draw(ctx, asteroidImages, canvas.width, canvas.height, isWarping)
        })
        asteroids = asteroids.filter(ast => ast.active)

        dust.forEach(p => {
          p.update(isWarping, warpSpeedMultiplier.current, canvas.width, canvas.height)
          p.draw(ctx, canvas.width, canvas.height, isWarping)
        })
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render(0)

    const handleResize = () => init()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [shouldReduceMotion, isWarping])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: isWarping ? "normal" : "screen" }}
    />
  )
}
