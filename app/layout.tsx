import type React from "react"
import type { Metadata } from "next"
import { Sora, Titan_One } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const fontSans = Sora({
  variable: '--font-sans',
  subsets: ["latin"]
})
const fontHeading = Titan_One({
  variable: '--font-heading',
  weight: ["400"],
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Quiz Elba me Leva - Museu",
  description: "Um quiz sobre Elba Ramalho, interativo com múltiplas paradas e perguntas!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={cn('antialiased min-h-screen bg-background font-sans ', fontSans.variable, fontHeading.variable)}>{children}</body>
    </html>
  )
}
