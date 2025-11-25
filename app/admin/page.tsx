"use client"

import type React from "react"

import { useState } from "react"
import { AdminPanel } from "@/components/admin-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Sparkles, AlertCircle } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple authentication (credentials from user request)
    if (login === "lolkas" && password === "paxa030501") {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("Неверный логин или пароль")
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl" />

        <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl shadow-primary/10 relative z-10">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-gradient font-bold">WellsStudio</span>
            </div>
            <CardTitle className="text-2xl text-foreground">Админ-панель</CardTitle>
            <CardDescription className="text-muted-foreground">Войдите для доступа к управлению</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                placeholder="Логин"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary/50"
              />
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-border/50 focus:border-primary/50"
              />

              {error && (
                <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-lg bg-destructive/10">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white border-0"
              >
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    )
  }

  return <AdminPanel />
}
