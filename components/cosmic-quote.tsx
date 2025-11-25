"use client"

import { useEffect, useRef, useState } from "react"
import { Rocket, Star } from "lucide-react"

export function CosmicQuote() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-pink-500/10 to-accent/10" />
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <Star
            key={i}
            size={Math.random() * 6 + 2}
            className="absolute text-white/20 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-pink-500/20 mb-8 animate-pulse-glow">
            <Rocket className="w-10 h-10 text-primary" />
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-4xl font-bold leading-relaxed mb-6">
            <span className="text-foreground">&ldquo;Каждая великая идея начинается с </span>
            <span className="text-gradient">первого шага</span>
            <span className="text-foreground"> в неизведанное&rdquo;</span>
          </blockquote>

          {/* Subtext */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Превращаю ваши идеи в работающие цифровые решения. От простых скриптов до сложных систем автоматизации —
            вместе мы создадим то, что выведет ваш бизнес на новую орбиту.
          </p>

          {/* Decorative line */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary" />
            <Star size={12} className="text-primary" fill="currentColor" />
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
