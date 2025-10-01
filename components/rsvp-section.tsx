"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ClipboardCheck, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase, type RSVPResponse } from "@/lib/supabase"

export function RSVPSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    menu: "ninguno",
    companions: "",
    comments: ""
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .insert([
          {
            attendance: "si",
            name: formData.name,
            menu: formData.menu,
            companions: formData.companions,
            comments: formData.comments
          }
        ])
        .select()

      if (error) {
        throw error
      }

      setIsSubmitted(true)
      toast({
        title: "¡Confirmación enviada!",
        description: "Gracias por confirmar tu asistencia",
      })
      
      setTimeout(() => {
        setIsModalOpen(false)
        setIsSubmitted(false)
        setFormData({
          name: "",
          menu: "ninguno",
          companions: "",
          comments: ""
        })
      }, 3000)
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu confirmación. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-primary/10 to-primary/20">
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
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6"
            >
              <ClipboardCheck className="w-8 h-8 text-primary" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-wedding-serif font-bold text-foreground mb-4 text-balance">
              Confirmación de Asistencia
            </h2>
            
            <div className="w-24 h-px bg-primary mx-auto mb-6" />
            
            <p className="text-lg text-muted-foreground font-wedding-sans max-w-2xl mx-auto leading-relaxed mb-4">
              ¡Esperamos contar con tu presencia en nuestro día especial!
            </p>
            
            <p className="text-sm text-muted-foreground font-wedding-sans">
              Por favor confirma tu asistencia antes del 20 de Febrero
            </p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => setIsModalOpen(true)}
              className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-wedding-sans transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Check className="w-5 h-5 inline mr-2" />
              Confirmar Asistencia
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* RSVP Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-background rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative z-40 modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-sm text-muted-foreground font-wedding-sans uppercase tracking-wide">RSVP</p>
                <h3 className="text-2xl font-wedding-serif font-bold text-foreground">
                  Confirmación de Asistencia
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-wedding-serif font-bold text-foreground mb-4">
                  ¡Gracias por confirmar tu asistencia!
                </h4>
                <p className="text-muted-foreground font-wedding-sans">
                  Nos vemos el 28 de Febrero
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-base font-wedding-sans font-medium text-foreground mb-2 block">
                    Apellido y Nombre
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                    className="font-wedding-sans bg-white border-2 border-primary/20 focus:border-primary focus:ring-primary/20"
                  />
                </div>

                {/* Menu */}
                <div>
                  <Label htmlFor="menu" className="text-base font-wedding-sans font-medium text-foreground mb-2 block">
                    ¿Necesitas un menú especial?
                  </Label>
                  <Select value={formData.menu} onValueChange={(value) => handleInputChange("menu", value)}>
                    <SelectTrigger className="font-wedding-sans bg-white border-2 border-primary/20 focus:border-primary focus:ring-primary/20">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent className="z-[60]">
                      <SelectItem value="ninguno">Ninguno</SelectItem>
                      <SelectItem value="celiaco">Celíaco</SelectItem>
                      <SelectItem value="vegetariano">Vegetariano</SelectItem>
                      <SelectItem value="vegano">Vegano</SelectItem>
                      <SelectItem value="diabetico">Diabético</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Companions */}
                <div>
                  <Label htmlFor="companions" className="text-base font-wedding-sans font-medium text-foreground mb-2 block">
                    Apellido y nombres de acompañantes (si corresponde)
                  </Label>
                  <Input
                    id="companions"
                    value={formData.companions}
                    onChange={(e) => handleInputChange("companions", e.target.value)}
                    placeholder="Nombres de tus acompañantes"
                    className="font-wedding-sans bg-white border-2 border-primary/20 focus:border-primary focus:ring-primary/20"
                  />
                </div>

                {/* Comments */}
                <div>
                  <Label htmlFor="comments" className="text-base font-wedding-sans font-medium text-foreground mb-2 block">
                    Comentarios
                  </Label>
                  <Textarea
                    id="comments"
                    value={formData.comments}
                    onChange={(e) => handleInputChange("comments", e.target.value)}
                    placeholder="Cualquier comentario adicional..."
                    rows={3}
                    className="font-wedding-sans bg-white border-2 border-primary/20 focus:border-primary focus:ring-primary/20"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 font-wedding-sans"
                  disabled={!formData.name || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Confirmar Asistencia
                    </>
                  )}
                </Button>

                <p className="text-sm text-muted-foreground font-wedding-sans text-center">
                  Por favor confirma tu asistencia antes del 20 de Febrero
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}