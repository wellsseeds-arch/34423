import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DownloadsContent } from "@/components/downloads-content"

export const metadata = {
  title: "Загрузки - WellsStudio",
  description: "Скачайте готовые программы и скрипты с видео-инструкциями",
}

export default function DownloadsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <DownloadsContent />
      </div>
      <Footer />
    </main>
  )
}
