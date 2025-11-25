"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Copy, Trash2, Key, FileBox, CheckCircle, LogOut, Sparkles } from "lucide-react"
import { initialFiles, initialKeys, type DownloadFile, type ActivationKey } from "@/lib/data-store"

function generateKey(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const segments = 4
  const segmentLength = 4
  const keyParts = []

  for (let i = 0; i < segments; i++) {
    let segment = ""
    for (let j = 0; j < segmentLength; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    keyParts.push(segment)
  }

  return keyParts.join("-")
}

export function AdminPanel() {
  const [files, setFiles] = useState<DownloadFile[]>(initialFiles)
  const [keys, setKeys] = useState<ActivationKey[]>(initialKeys)
  const [newFile, setNewFile] = useState({
    title: "",
    description: "",
    videoUrl: "",
    fileUrl: "",
    fileName: "",
    price: "",
    category: "",
  })
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleAddFile = () => {
    if (!newFile.title || !newFile.fileName || !newFile.price) return

    const file: DownloadFile = {
      id: Date.now().toString(),
      title: newFile.title,
      description: newFile.description,
      videoUrl: newFile.videoUrl || undefined,
      fileUrl: newFile.fileUrl || `/files/${newFile.fileName}`,
      fileName: newFile.fileName,
      price: Number.parseInt(newFile.price),
      category: newFile.category || "Другое",
      createdAt: new Date(),
    }

    setFiles([...files, file])
    setNewFile({ title: "", description: "", videoUrl: "", fileUrl: "", fileName: "", price: "", category: "" })
  }

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter((f) => f.id !== id))
    setKeys(keys.filter((k) => k.fileId !== id))
  }

  const handleGenerateKey = (fileId: string) => {
    const newKey: ActivationKey = {
      id: Date.now().toString(),
      key: generateKey(),
      fileId,
      used: false,
      createdAt: new Date(),
    }
    setKeys([...keys, newKey])
  }

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id))
  }

  const handleLogout = () => {
    window.location.reload()
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 py-8 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Админ-панель</h1>
                <p className="text-muted-foreground text-sm">WellsStudio — управление файлами и ключами</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2 border-border/50 hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive bg-transparent"
            >
              <LogOut size={16} />
              Выйти
            </Button>
          </div>

          <Tabs defaultValue="files" className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm border border-border/50 p-1">
              <TabsTrigger
                value="files"
                className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                <FileBox size={16} />
                Файлы
              </TabsTrigger>
              <TabsTrigger
                value="keys"
                className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                <Key size={16} />
                Ключи
              </TabsTrigger>
              <TabsTrigger
                value="add"
                className="gap-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
              >
                <Plus size={16} />
                Добавить
              </TabsTrigger>
            </TabsList>

            <TabsContent value="files">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Файлы для скачивания</CardTitle>
                  <CardDescription>Список всех доступных файлов</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50 hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Название</TableHead>
                        <TableHead className="text-muted-foreground">Категория</TableHead>
                        <TableHead className="text-muted-foreground">Цена</TableHead>
                        <TableHead className="text-muted-foreground">Ключей</TableHead>
                        <TableHead className="text-muted-foreground">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {files.map((file) => (
                        <TableRow key={file.id} className="border-border/50 hover:bg-primary/5">
                          <TableCell className="text-foreground font-medium">{file.title}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                              {file.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-foreground">{file.price.toLocaleString()} ₽</TableCell>
                          <TableCell>
                            <span className="text-green-500 font-medium">
                              {keys.filter((k) => k.fileId === file.id && !k.used).length}
                            </span>
                            <span className="text-muted-foreground"> активных</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleGenerateKey(file.id)}
                                className="border-border/50 hover:border-primary/50 hover:bg-primary/10"
                              >
                                <Key size={14} className="mr-1" />
                                Ключ
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteFile(file.id)}
                                className="border-border/50 hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="keys">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Ключи активации</CardTitle>
                  <CardDescription>Все сгенерированные ключи</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50 hover:bg-transparent">
                        <TableHead className="text-muted-foreground">Ключ</TableHead>
                        <TableHead className="text-muted-foreground">Файл</TableHead>
                        <TableHead className="text-muted-foreground">Статус</TableHead>
                        <TableHead className="text-muted-foreground">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {keys.map((key) => {
                        const file = files.find((f) => f.id === key.fileId)
                        return (
                          <TableRow key={key.id} className="border-border/50 hover:bg-primary/5">
                            <TableCell className="font-mono text-foreground">{key.key}</TableCell>
                            <TableCell className="text-foreground">{file?.title || "Удалён"}</TableCell>
                            <TableCell>
                              <Badge
                                variant={key.used ? "secondary" : "default"}
                                className={
                                  key.used
                                    ? "bg-muted text-muted-foreground"
                                    : "bg-green-500/20 text-green-500 border-0"
                                }
                              >
                                {key.used ? "Использован" : "Активен"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCopyKey(key.key)}
                                  className="border-border/50 hover:border-primary/50 hover:bg-primary/10"
                                >
                                  {copiedKey === key.key ? (
                                    <CheckCircle size={14} className="text-green-500" />
                                  ) : (
                                    <Copy size={14} />
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteKey(key.id)}
                                  className="border-border/50 hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Добавить файл</CardTitle>
                  <CardDescription>Создайте новый файл для скачивания</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 max-w-xl">
                    <Input
                      placeholder="Название"
                      value={newFile.title}
                      onChange={(e) => setNewFile({ ...newFile, title: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-primary/50"
                    />
                    <Textarea
                      placeholder="Описание"
                      value={newFile.description}
                      onChange={(e) => setNewFile({ ...newFile, description: e.target.value })}
                      className="bg-background/50 border-border/50 resize-none focus:border-primary/50"
                      rows={3}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Категория"
                        value={newFile.category}
                        onChange={(e) => setNewFile({ ...newFile, category: e.target.value })}
                        className="bg-background/50 border-border/50 focus:border-primary/50"
                      />
                      <Input
                        placeholder="Цена (₽)"
                        type="number"
                        value={newFile.price}
                        onChange={(e) => setNewFile({ ...newFile, price: e.target.value })}
                        className="bg-background/50 border-border/50 focus:border-primary/50"
                      />
                    </div>
                    <Input
                      placeholder="Имя файла (например: script.zip)"
                      value={newFile.fileName}
                      onChange={(e) => setNewFile({ ...newFile, fileName: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-primary/50"
                    />
                    <Input
                      placeholder="Ссылка на видео-инструкцию (необязательно)"
                      value={newFile.videoUrl}
                      onChange={(e) => setNewFile({ ...newFile, videoUrl: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-primary/50"
                    />
                    <Button
                      onClick={handleAddFile}
                      className="w-fit gap-2 bg-gradient-to-r from-primary to-pink-500 hover:from-primary/90 hover:to-pink-500/90 border-0"
                    >
                      <Plus size={16} />
                      Добавить файл
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
