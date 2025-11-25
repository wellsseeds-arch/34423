"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket, Star } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            size={Math.random() * 8 + 4}
            className="absolute text-white/30 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>


      <div className="container mx-auto px-4 z-10 pt-20 md:pt-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full glass-effect mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Rocket size={14} className="text-primary" />
              <span className="text-xs md:text-sm text-foreground/80">Запускаем ваши идеи в космос</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              <span className="text-foreground">Цифровые решения</span>
              <br />
              <span className="text-gradient glow-text">нового поколения</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-foreground/70 mb-6 md:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              Создаю сайты, Telegram ботов и скрипты автоматизации. Готовые решения для вашего бизнеса с поддержкой.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Link href="#services" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white gap-2 w-full shadow-xl shadow-primary/25 border-0"
                >
                  Смотреть услуги
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/downloads" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 w-full glass-effect bg-transparent"
                >
                  Скачать программы
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
              <StatItem value="50+" label="Проектов" />
              <StatItem value="100%" label="Качество" />
              <StatItem value="24/7" label="Поддержка" />
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center">
            <div
              className="relative animate-float w-[500px] h-[600px]"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: "transform 0.5s ease-out",
              }}
            >
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-primary/30 via-pink-500/20 to-accent/30 rounded-full scale-75" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Rocket className="w-64 h-64 text-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">{value}</div>
      <div className="text-xs md:text-sm text-foreground/60">{label}</div>
    </div>
  )
}
