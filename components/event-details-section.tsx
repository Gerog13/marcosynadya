"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Calendar, Clock, MapPin, Shirt } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const eventDetails = [
  {
    icon: Calendar,
    title: "Fecha",
    info: "Sábado, 28 de Febrero de 2026",
    description: "Marca tu calendario para nuestro día especial",
  },
  {
    icon: Clock,
    title: "Hora Ceremonia",
    info: "17:30 hs",
    description: "Ceremonia religiosa en la Iglesia",
  },
  {
    icon: MapPin,
    title: "Ceremonia",
    info: "Iglesia San Vicente Ferrer",
    description: "Celebramos nuestro amor en la Iglesia",
    gmapsLink: "https://www.google.com/maps/search/Iglesia+San+Vicente+Ferrer,+Mendoza",
  },
  {
    icon: Clock,
    title: "Hora Celebración",
    info: "19:30 hs",
    description: "Recepción y fiesta",
  },
  {
    icon: MapPin,
    title: "Celebración",
    info: "Quinta Doña Elvira",
    description: "Festejamos en Quinta Doña Elvira",
    gmapsLink: "https://www.google.com/maps/search/Quinta+Doña+Elvira,+Mendoza",
  },
  {
    icon: Shirt,
    title: "Dress Code",
    info: "Gama de Colores Tierra",
    description: "Los colores blanco y beige están reservados para la novia",
  },
]

function DetailCard({ detail, index }: { detail: (typeof eventDetails)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full bg-background/50 border-border/50 hover:bg-background/70 transition-colors duration-300">
        <CardContent className="p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-4"
          >
            <detail.icon className="w-6 h-6 text-primary" />
          </motion.div>

          <h3 className="text-xl font-wedding-serif font-semibold text-foreground mb-2">{detail.title}</h3>

          <p className="text-lg font-wedding-sans font-medium text-primary mb-2">{detail.info}</p>

          <p className="text-sm text-muted-foreground font-wedding-sans leading-relaxed mb-4">{detail.description}</p>

          {detail.gmapsLink && (
            <a href={detail.gmapsLink} target="_blank" rel="noopener noreferrer">
              <Button variant="default" size="sm" className="cursor-pointer w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Cómo llegar
              </Button>
            </a>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}


export function EventDetailsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="event-details" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-wedding-serif font-bold text-foreground mb-4 text-balance">
            Detalles del Evento
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground font-wedding-sans max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitas saber sobre nuestro día especial. ¡No podemos esperar a celebrarlo con vos!
          </p>
        </motion.div>

        {/* Event Details Grid - 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {eventDetails.map((detail, index) => (
            <DetailCard key={index} detail={detail} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}
