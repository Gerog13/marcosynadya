"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Gift, Copy, CreditCard, Building2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const bankInfo = {
  bank: "Banco Galicia",
  accountHolder: "Marcos Gabriel Rodriguez",
  accountNumber: "4046514-3 300-1",
  cbu: "0070300830004046514317",
  alias: "siquiero.nadyamarcos",
  cuil: "20347851281",
  du: "34785128"
}

export function GiftsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado",
      description: `${label} copiado al portapapeles`,
    })
  }

  return (
    <>
      <section id="gifts" className="py-20 px-4 bg-gradient-to-b from-card/30 to-background">
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
              <Gift className="w-8 h-8 text-primary" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-wedding-serif font-bold text-foreground mb-4 text-balance">
              Regalos
            </h2>
            
            <div className="w-24 h-px bg-primary mx-auto mb-6" />
            
            <p className="text-lg text-muted-foreground font-wedding-sans max-w-2xl mx-auto leading-relaxed mb-8">
              Tu presencia es lo más importante para nosotros. Si además deseas hacernos un regalo, podes ayudarnos con nuestra luna de miel.
            </p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-wedding-sans transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Más Información
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
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
            className="bg-background rounded-2xl p-4 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-xl md:text-2xl font-wedding-serif font-bold text-foreground">
                Información Bancaria
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="bg-card/50 rounded-lg p-4 md:p-6 border border-border/50">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <Building2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <h4 className="text-base md:text-lg font-wedding-serif font-semibold text-foreground">
                    Datos Bancarios
                  </h4>
                </div>
                
                <div className="space-y-2 md:space-y-3">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                    <span className="font-wedding-sans text-sm md:text-base text-muted-foreground">Banco:</span>
                    <span className="font-wedding-sans font-medium text-foreground text-sm md:text-base">{bankInfo.bank}</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                    <span className="font-wedding-sans text-sm md:text-base text-muted-foreground">Titular:</span>
                    <span className="font-wedding-sans font-medium text-foreground text-sm md:text-base break-words">{bankInfo.accountHolder}</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                    <span className="font-wedding-sans text-sm md:text-base text-muted-foreground">N° Cuenta:</span>
                    <span className="font-wedding-sans font-medium text-foreground text-sm md:text-base break-all">{bankInfo.accountNumber}</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                    <span className="font-wedding-sans text-sm md:text-base text-muted-foreground">CBU:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-wedding-sans font-medium text-foreground text-sm md:text-base break-all">{bankInfo.cbu}</span>
                      <button 
                        onClick={() => copyToClipboard(bankInfo.cbu, "CBU")}
                        className="p-1 hover:bg-muted rounded transition-colors flex-shrink-0"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                    <span className="font-wedding-sans text-sm md:text-base text-muted-foreground">Alias:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-wedding-sans font-medium text-foreground text-sm md:text-base break-all">{bankInfo.alias}</span>
                      <button 
                        onClick={() => copyToClipboard(bankInfo.alias, "Alias")}
                        className="p-1 hover:bg-muted rounded transition-colors flex-shrink-0"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                    <span className="font-wedding-sans text-sm md:text-base text-muted-foreground">CUIL:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-wedding-sans font-medium text-foreground text-sm md:text-base break-all">{bankInfo.cuil}</span>
                      <button 
                        onClick={() => copyToClipboard(bankInfo.cuil, "CUIL")}
                        className="p-1 hover:bg-muted rounded transition-colors flex-shrink-0"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-0">
                    <span className="font-wedding-sans text-sm md:text-base text-muted-foreground">DNI/DU:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-wedding-sans font-medium text-foreground text-sm md:text-base break-all">{bankInfo.du}</span>
                      <button 
                        onClick={() => copyToClipboard(bankInfo.du, "DNI/DU")}
                        className="p-1 hover:bg-muted rounded transition-colors flex-shrink-0"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 rounded-lg p-4 md:p-6 border border-border/50">
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <h4 className="text-base md:text-lg font-wedding-serif font-semibold text-foreground">
                    Otras Opciones
                  </h4>
                </div>
                
                <p className="text-sm md:text-base text-muted-foreground font-wedding-sans leading-relaxed">
                  Si prefieres, también puedes contactarnos directamente para otras formas de regalo.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
