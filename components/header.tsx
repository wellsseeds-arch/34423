"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-primary/20 shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary via-pink-500 to-accent flex items-center justify-center group-hover:animate-pulse-glow transition-all">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold text-gradient">Wells Studio</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/">Главная</NavLink>
            <NavLink href="#services">Услуги</NavLink>
            <NavLink href="/downloads">Загрузки</NavLink>
            <NavLink href="#contact">Контакты</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="#contact">
              <Button className="bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white border-0 shadow-lg shadow-primary/25">
                Связаться
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-primary/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Открыть меню"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden py-4 border-t border-primary/20 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
                Главная
              </MobileNavLink>
              <MobileNavLink href="#services" onClick={() => setIsOpen(false)}>
                Услуги
              </MobileNavLink>
              <MobileNavLink href="/downloads" onClick={() => setIsOpen(false)}>
                Загрузки
              </MobileNavLink>
              <MobileNavLink href="#contact" onClick={() => setIsOpen(false)}>
                Контакты
              </MobileNavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative text-foreground/70 hover:text-foreground transition-colors py-2 group">
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-pink-500 group-hover:w-full transition-all duration-300" />
    </Link>
  )
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      className="text-foreground/70 hover:text-foreground transition-colors py-3 px-4 rounded-lg hover:bg-primary/10"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
