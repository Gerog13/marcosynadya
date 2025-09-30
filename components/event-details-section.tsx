"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Calendar, Clock, MapPin, Shirt, Gift, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const eventDetails = [
  {
    icon: Calendar,
    title: "Fecha",
    info: "Viernes, 28 de Febrero, 2026",
    description: "Marca tu calendario para nuestro día especial",
  },
  {
    icon: Clock,
    title: "Hora",
    info: "Ceremonia: 17:00 - Recepción: 19:00",
    description: "La ceremonia comienza a las 17:00, seguida de la recepción",
  },
  {
    icon: MapPin,
    title: "Lugar",
    info: "Iglesia San Vicente Ferrer & Quinta Doña Elvira",
    description: "Ceremonia en la iglesia, fiesta en la quinta",
  },
  {
    icon: Shirt,
    title: "Código de Vestimenta",
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

          <p className="text-sm text-muted-foreground font-wedding-sans leading-relaxed">{detail.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const locations = [
  {
    name: "Basílica San Vicente Ferrer",
    address: "Ceremonia - 17:00 Hs",
    iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.9447604182164!2d-68.84729222433113!3d-32.92605767360173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0bd86e6067fd%3A0x84afb644c3d05451!2sBas%C3%ADlica%20San%20Vicente%20Ferrer!5e0!3m2!1ses-419!2sar!4v1759188207555!5m2!1ses-419!2sar"
  },
  {
    name: "Quinta Doña Elvira",
    address: "Recepción - 19:00 Hs",
    iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.771126979733!2d-68.76708834962042!3d-32.93064470320311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0dcac1b78d11%3A0x401ba2de0f77a930!2sQuinta%20Do%C3%B1a%20Elvira!5e0!3m2!1ses-419!2sar!4v1759188224886!5m2!1ses-419!2sar"
  }
]

export function EventDetailsSection() {
  const ref = useRef(null)
  const mapRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isMapInView = useInView(mapRef, { once: true, margin: "-100px" })
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0)

  const nextLocation = () => {
    setCurrentLocationIndex((prev) => (prev + 1) % locations.length)
  }

  const prevLocation = () => {
    setCurrentLocationIndex((prev) => (prev - 1 + locations.length) % locations.length)
  }

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
            Todo lo que necesitas saber sobre nuestro día especial. ¡No podemos esperar a celebrar contigo!
          </p>
        </motion.div>

        {/* Event Details Grid - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {eventDetails.map((detail, index) => (
            <DetailCard key={index} detail={detail} index={index} />
          ))}
        </div>

        {/* Map and Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map Carousel */}
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isMapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden pt-0">
              <CardContent className="p-0">
                <div className="relative">
                  {/* Map Carousel */}
                  <div className="w-full h-80 relative overflow-hidden">
                    <motion.div
                      key={currentLocationIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <iframe
                        src={locations[currentLocationIndex].iframe}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={locations[currentLocationIndex].name}
                      />
                    </motion.div>

                    {/* Navigation Buttons */}
                    <Button
                      onClick={prevLocation}
                      variant="secondary"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-md"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={nextLocation}
                      variant="secondary"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-md"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>

                    {/* Location Indicators */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {locations.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentLocationIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentLocationIndex ? 'bg-primary' : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-wedding-serif font-semibold text-foreground mb-2">
                    {locations[currentLocationIndex].name}
                  </h3>
                  <p className="text-muted-foreground font-wedding-sans mb-4">
                    {locations[currentLocationIndex].address}
                    <br />
                    Mendoza, Argentina
                  </p>
                  <p className="text-sm text-muted-foreground font-wedding-sans leading-relaxed">
                    {currentLocationIndex === 0 
                      ? "Ceremonia en la basílica histórica de San Vicente Ferrer."
                      : "Celebración y fiesta en la hermosa Quinta Doña Elvira."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Regalos Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isMapInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-background/50 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/20 rounded-full">
                      <Gift className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-wedding-serif font-semibold text-foreground mb-2">Regalos</h3>
                    <p className="text-muted-foreground font-wedding-sans leading-relaxed">
                      ¡Tu presencia es el mejor regalo! Si deseas contribuir a nuestro futuro juntos, hemos configurado una opción de regalo digital abajo.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
