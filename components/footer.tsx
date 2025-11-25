import Link from "next/link"
import { Sparkles, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-card/50 backdrop-blur-sm border-t border-border/50 py-10 md:py-16 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-primary via-pink-500 to-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold text-gradient">Wells Studio</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-4 md:mb-6">
              Профессиональная разработка сайтов, Telegram ботов и скриптов автоматизации для вашего бизнеса.
            </p>
            <Link
              href="https://t.me/balmer228"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm"
            >
              <Send size={16} />
              @balmer228
            </Link>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-foreground text-sm md:text-base">Навигация</h4>
            <ul className="space-y-2 md:space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="text-muted-foreground hover:text-primary transition-colors">
                  Загрузки
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-foreground text-sm md:text-base">Контакты</h4>
            <ul className="space-y-2 md:space-y-3 text-sm text-muted-foreground">
              <li>Telegram: @balmer228</li>
              <li className="break-all">lolkas_popkas@mail.ru</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium text-foreground/80">ИП Воробьев Павел Дмитриевич</p>
              <p>ИНН: 422196688700 | ОГРНИП: 322420500028609</p>
            </div>
            <p className="text-xs text-muted-foreground">{new Date().getFullYear()} Wells Studio</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
