"use client"

import { Globe, Bot, Code2, Zap, Shield, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

const services = [
  {
    icon: Globe,
    title: "Создание сайтов",
    description:
      "Разработка современных адаптивных сайтов любой сложности. Landing page, корпоративные сайты, интернет-магазины.",
    price: "от 15 000 ₽",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Bot,
    title: "Telegram боты",
    description: "Разработка ботов для автоматизации бизнес-процессов, рассылок, приема заказов и платежей.",
    price: "от 10 000 ₽",
    gradient: "from-primary to-pink-500",
  },
  {
    icon: Code2,
    title: "Скрипты автоматизации",
    description: "Написание скриптов для автоматизации рутинных задач, парсинг данных, интеграции с API.",
    price: "от 5 000 ₽",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    icon: Zap,
    title: "Готовые решения",
    description: "Библиотека готовых скриптов и программ для скачивания с видео-инструкциями по настройке.",
    price: "от 1 000 ₽",
    gradient: "from-yellow-500 to-orange-400",
  },
  {
    icon: Shield,
    title: "Техническая поддержка",
    description: "Поддержка и обновление разработанных решений. Быстрое реагирование на проблемы.",
    price: "от 3 000 ₽/мес",
    gradient: "from-red-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Срочные заказы",
    description: "Выполнение срочных заказов в кратчайшие сроки с приоритетной поддержкой.",
    price: "договорная",
    gradient: "from-indigo-500 to-violet-500",
  },
]

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-10 md:mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="inline-block px-4 py-2 rounded-full glass-effect text-sm text-primary mb-4">
            Что я предлагаю
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Мои </span>
            <span className="text-gradient">услуги</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto">
            Полный спектр услуг по разработке цифровых решений для вашего бизнеса
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group relative bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 overflow-hidden ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <CardHeader className="pb-2">
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <service.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <CardTitle className="text-foreground text-lg md:text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-primary font-bold text-base md:text-lg">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
