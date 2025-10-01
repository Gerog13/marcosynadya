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
  title: "Nadya & Marcos - 28 de Febrero",
  description: "¡Nos casamos! Te invitamos a celebrar este momento tan especial con nosotros. Una invitación para nuestro casamiento 💕",
  generator: "Next.js",
  keywords: ["boda", "casamiento", "Marcos", "Nadya", "invitación", "celebration", "wedding"],
  authors: [{ name: "Nadya & Marcos" }],
  creator: "Nadya & Marcos",
  publisher: "Nadya & Marcos",
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
    url: "https://marcosynadya.com", 
    siteName: "Nadya & Marcos - Boda",
    title: "Nadya & Marcos - 28 de Febrero",
    description: "¡Nos casamos! Te invitamos a celebrar este momento tan especial con nosotros. Una invitación para nuestro casamiento 💕",
    images: [
      {
        url: "https://marcosynadya.com/casamiento-2.jpeg",
        width: 1200,
        height: 630,
        alt: "Nadya & Marcos - 28 de Febrero",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadya & Marcos - 28 de Febrero",
    description: "¡Nos casamos! Te invitamos a celebrar este momento tan especial con nosotros. Una invitación para nuestro casamiento 💕",
    images: ["https://marcosynadya.com/casamiento-2.jpeg"],
  },
  alternates: {
    canonical: "https://marcosynadya.com", 
  },
  other: {
    "theme-color": "#8B5A3C",
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
