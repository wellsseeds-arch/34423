import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

import { Inter, Space_Grotesk, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" })

export const metadata: Metadata = {
  title: "Wells Studio - Создание сайтов, Telegram ботов и скриптов автоматизации",
  description:
    "Профессиональная разработка сайтов под ключ, создание Telegram ботов для бизнеса, написание скриптов автоматизации. Готовые решения с поддержкой. ИП Воробьев Павел Дмитриевич.",
  keywords: [
    "создание сайтов",
    "разработка сайтов",
    "заказать сайт",
    "сайт под ключ",
    "telegram бот",
    "создание ботов",
    "бот для телеграм",
    "скрипты автоматизации",
    "автоматизация бизнеса",
    "парсинг данных",
    "landing page",
    "интернет магазин",
    "Wells Studio",
    "веб разработка",
  ],
  authors: [{ name: "Wells Studio" }],
  creator: "Wells Studio",
  publisher: "ИП Воробьев Павел Дмитриевич",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Wells Studio",
    title: "Wells Studio - Создание сайтов, ботов и автоматизация",
    description: "Профессиональная разработка сайтов, Telegram ботов и скриптов автоматизации для вашего бизнеса",
    images: ["/images/hero-main.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wells Studio - Создание сайтов, ботов и автоматизация",
    description: "Профессиональная разработка сайтов, Telegram ботов и скриптов автоматизации",
    images: ["/images/hero-main.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  metadataBase: new URL("https://wellsstudio.ru"),
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <meta name="yandex-verification" content="" />
        <meta name="google-site-verification" content="" />
        <link rel="canonical" href="https://wellsstudio.ru" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
