import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Marcos & Nadya - 15 de Diciembre",
  description: "¡Nos casamos! Te invitamos a celebrar el amor y la vida bailando con nosotros. Una invitación especial para el baile 💃🕺",
  generator: "Next.js",
  keywords: ["boda", "casamiento", "Marcos", "Nadya", "invitación", "celebration", "wedding"],
  authors: [{ name: "Marcos & Nadya" }],
  creator: "Marcos & Nadya",
  publisher: "Marcos & Nadya",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://marcosynadya.com", // Cambia esto por tu dominio real
    siteName: "Marcos & Nadya - Boda",
    title: "Marcos & Nadya - 15 de Diciembre",
    description: "¡Nos casamos! Te invitamos a celebrar el amor y la vida bailando con nosotros. Una invitación especial para el baile 💃🕺",
    images: [
      {
        url: "https://marcosynadya.com/casamiento-1.jpeg", // URL completa para mejor compatibilidad
        width: 1200,
        height: 630,
        alt: "Marcos & Nadya - 15 de Diciembre",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcos & Nadya - 15 de Diciembre",
    description: "¡Nos casamos! Te invitamos a celebrar el amor y la vida bailando con nosotros. Una invitación especial para el baile 💃🕺",
    images: ["https://marcosynadya.com/casamiento-1.jpeg"],
  },
  alternates: {
    canonical: "https://marcosynadya.com", // Cambia por tu dominio real
  },
  other: {
    "theme-color": "#8B5A3C", // Color de tema para móviles
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans ${poppins.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
