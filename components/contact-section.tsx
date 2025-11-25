"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, MessageCircle, Mail, Loader2, CheckCircle } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setIsSubmitted(false), 5000)
      }
    } catch {
      const telegramUrl = `https://t.me/balmer228?text=${encodeURIComponent(
        `Заявка с сайта Wells Studio\n\nИмя: ${formData.name}\nEmail: ${formData.email}\n\nСообщение: ${formData.message}`,
      )}`
      window.open(telegramUrl, "_blank")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-pink-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl shadow-primary/10">
            <CardHeader className="text-center pb-2 px-4 md:px-6">
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                <Mail className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <CardTitle className="text-xl md:text-2xl">
                <span className="text-foreground">Свяжитесь </span>
                <span className="text-gradient">со мной</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm md:text-base">
                Опишите задачу и я свяжусь с вами
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 px-4 md:px-6">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 gap-4 animate-in fade-in zoom-in">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-lg font-medium text-foreground">Заявка отправлена!</p>
                  <p className="text-muted-foreground text-center text-sm">Я свяжусь с вами в ближайшее время</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <Input
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background/50 border-border/50 text-foreground focus:border-primary/50 transition-colors h-11"
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background/50 border-border/50 text-foreground focus:border-primary/50 transition-colors h-11"
                    />
                  </div>
                  <Textarea
                    placeholder="Опишите вашу задачу..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-background/50 border-border/50 text-foreground resize-none focus:border-primary/50 transition-colors"
                  />
                  <div className="flex flex-col gap-3">
                    <Button
                      type="submit"
                      className="w-full gap-2 bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white border-0 shadow-lg shadow-primary/25 h-11"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                      {isSubmitting ? "Отправка..." : "Отправить"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full gap-2 border-primary/30 hover:bg-primary/10 hover:border-primary/50 bg-transparent h-11"
                      onClick={() => window.open("https://t.me/balmer228", "_blank")}
                    >
                      <MessageCircle size={18} />
                      Telegram
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
