"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function FooterSection() {
  return (
    <footer className="bg-secondary/30 border-t border-border/50">
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-sm mb-6">
            <Image
              src="/avion-1.png"
              alt="Abrir invitación"
              width={0}
              height={0}
              style={{ width: "60px", height: "auto" }}
              className="object-contain ml-0.5 mt-1 w-auto h-auto"
              priority
            />
          </div>
          <p className="text-sm text-muted-foreground font-wedding-sans mb-4">
            Con amor,
          </p>
          <h3 className="text-2xl md:text-3xl font-wedding-serif font-bold text-foreground mb-6">
            Nadya & Marcos
          </h3>
          <p className="text-sm md:text-base text-muted-foreground font-wedding-sans">
            28 de Febrero, 2026 • #NadyayMarcos
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
