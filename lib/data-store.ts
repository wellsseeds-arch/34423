// Временное хранилище данных (в реальном проекте использовать базу данных)
export interface DownloadFile {
  id: string
  title: string
  description: string
  videoUrl?: string
  fileUrl: string
  fileName: string
  price: number
  category: string
  createdAt: Date
}

export interface ActivationKey {
  id: string
  key: string
  fileId: string
  used: boolean
  usedAt?: Date
  createdAt: Date
}

// Демо-данные для загрузок
export const initialFiles: DownloadFile[] = [
  {
    id: "1",
    title: "Автопостинг в Telegram",
    description:
      "Скрипт для автоматической публикации постов в Telegram каналах по расписанию. Поддержка текста, изображений и видео.",
    videoUrl: "https://www.youtube.com/watch?v=example1",
    fileUrl: "/files/telegram-autoposter.zip",
    fileName: "telegram-autoposter.zip",
    price: 2500,
    category: "Telegram",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Парсер данных с сайтов",
    description: "Универсальный парсер для сбора данных с веб-сайтов. Настраиваемые шаблоны, экспорт в CSV и Excel.",
    videoUrl: "https://www.youtube.com/watch?v=example2",
    fileUrl: "/files/web-parser.zip",
    fileName: "web-parser.zip",
    price: 3500,
    category: "Автоматизация",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "CRM для малого бизнеса",
    description: "Готовая система управления клиентами с интеграцией Telegram уведомлений.",
    fileUrl: "/files/mini-crm.zip",
    fileName: "mini-crm.zip",
    price: 5000,
    category: "Бизнес",
    createdAt: new Date(),
  },
]

export const initialKeys: ActivationKey[] = []
