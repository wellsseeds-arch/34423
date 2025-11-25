"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Download, PlayCircle, Key, CheckCircle, AlertCircle, Sparkles } from "lucide-react"
import { initialFiles, initialKeys, type DownloadFile } from "@/lib/data-store"

export function DownloadsContent() {
  const [files] = useState<DownloadFile[]>(initialFiles)
  const [selectedFile, setSelectedFile] = useState<DownloadFile | null>(null)
  const [activationKey, setActivationKey] = useState("")
  const [keyStatus, setKeyStatus] = useState<"idle" | "valid" | "invalid" | "used">("idle")
  const [downloadReady, setDownloadReady] = useState(false)

  const handleActivate = () => {
    const key = initialKeys.find((k) => k.key === activationKey && k.fileId === selectedFile?.id)

    if (!key) {
      setKeyStatus("invalid")
      return
    }

    if (key.used) {
      setKeyStatus("used")
      return
    }

    setKeyStatus("valid")
    setDownloadReady(true)
  }

  const handleDownload = () => {
    if (selectedFile) {
      alert(`Скачивание файла: ${selectedFile.fileName}\n\nВ production версии здесь будет реальный файл.`)
    }
  }

  const resetDialog = () => {
    setActivationKey("")
    setKeyStatus("idle")
    setDownloadReady(false)
    setSelectedFile(null)
  }

  return (
    <section className="py-12 min-h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm text-primary mb-4">
            <Download size={16} />
            Библиотека файлов
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Центр </span>
            <span className="text-gradient">загрузок</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Готовые программы и скрипты для скачивания. Для загрузки введите ключ активации, полученный после оплаты.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file, index) => (
            <Card
              key={file.id}
              className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    {file.category}
                  </Badge>
                  <span className="text-primary font-bold text-lg">{file.price.toLocaleString()} ₽</span>
                </div>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                  {file.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">{file.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {file.videoUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
                      onClick={() => window.open(file.videoUrl, "_blank")}
                    >
                      <PlayCircle size={16} />
                      Видео
                    </Button>
                  )}
                  <Dialog onOpenChange={(open) => !open && resetDialog()}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="flex-1 gap-2 bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 text-white border-0"
                        onClick={() => setSelectedFile(file)}
                      >
                        <Download size={16} />
                        Скачать
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card/95 backdrop-blur-xl border-border/50">
                      <DialogHeader>
                        <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                          <Key className="w-6 h-6 text-white" />
                        </div>
                        <DialogTitle className="text-foreground text-center">Активация загрузки</DialogTitle>
                        <DialogDescription className="text-muted-foreground text-center">
                          Введите ключ активации для скачивания &quot;{selectedFile?.title}&quot;
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            value={activationKey}
                            onChange={(e) => {
                              setActivationKey(e.target.value.toUpperCase())
                              setKeyStatus("idle")
                            }}
                            className="bg-background/50 border-border/50 text-foreground font-mono focus:border-primary/50"
                            disabled={downloadReady}
                          />
                          <Button
                            onClick={handleActivate}
                            disabled={!activationKey || downloadReady}
                            className="bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 border-0"
                          >
                            <Key size={16} />
                          </Button>
                        </div>

                        {keyStatus === "invalid" && (
                          <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-lg bg-destructive/10">
                            <AlertCircle size={16} />
                            Неверный ключ активации
                          </div>
                        )}

                        {keyStatus === "used" && (
                          <div className="flex items-center gap-2 text-destructive text-sm p-3 rounded-lg bg-destructive/10">
                            <AlertCircle size={16} />
                            Этот ключ уже был использован
                          </div>
                        )}

                        {keyStatus === "valid" && (
                          <div className="flex items-center gap-2 text-green-500 text-sm p-3 rounded-lg bg-green-500/10">
                            <CheckCircle size={16} />
                            Ключ активирован успешно!
                          </div>
                        )}

                        {downloadReady && (
                          <Button
                            onClick={handleDownload}
                            className="w-full gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-0"
                          >
                            <Download size={16} />
                            Скачать {selectedFile?.fileName}
                          </Button>
                        )}

                        <p className="text-xs text-muted-foreground text-center">
                          Ключ активации вы получите после оплаты. Свяжитесь с нами в Telegram: @balmer228
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state decoration */}
        {files.length === 0 && (
          <div className="text-center py-20">
            <Sparkles className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-lg">Файлы скоро появятся...</p>
          </div>
        )}
      </div>
    </section>
  )
}
