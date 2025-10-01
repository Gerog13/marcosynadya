"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Calendar } from "lucide-react"

export function CountdownSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const weddingDate = new Date("2026-02-28T17:00:00").getTime()
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const addToCalendar = () => {
    const eventDetails = {
      title: "Boda de Nadya & Marcos",
      startDate: "20260228T170000",
      endDate: "20260228T230000",
      description: "Ceremonia en Iglesia San Vicente Ferrer, seguida de recepción en Quinta Doña Elvira",
      location: "Iglesia San Vicente Ferrer, Mendoza, Argentina"
    }

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startDate}/${eventDetails.endDate}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`
    
    window.open(googleUrl, '_blank')
  }

  return (
    <section id="countdown" className="py-20 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6"
          >
            <Calendar className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-wedding-serif font-bold text-foreground mb-4 text-balance">
            Agendá la Fecha
          </h2>
          
          <div className="w-24 h-px bg-primary mx-auto mb-6" />
          
          <p className="text-2xl md:text-3xl font-wedding-serif font-semibold text-primary mb-8">
            28 de Febrero
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-4 gap-4 md:gap-8 mb-12"
        >
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-wedding-serif font-bold text-primary mb-2">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base font-wedding-sans text-muted-foreground uppercase tracking-wide">
              Días
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-wedding-serif font-bold text-primary mb-2">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base font-wedding-sans text-muted-foreground uppercase tracking-wide">
              Hs
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-wedding-serif font-bold text-primary mb-2">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base font-wedding-sans text-muted-foreground uppercase tracking-wide">
              Min
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl md:text-6xl font-wedding-serif font-bold text-primary mb-2">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm md:text-base font-wedding-sans text-muted-foreground uppercase tracking-wide">
              Seg
            </div>
          </div>
        </motion.div>

        {/* Add to Calendar Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={addToCalendar}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-wedding-sans transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Calendar className="w-5 h-5" />
            Agendar Fecha
          </button>
        </motion.div>
      </div>
    </section>
  )
}
