"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface EnvelopeAnimationProps {
  onComplete: () => void;
  onHeroReveal?: () => void;
}

export function EnvelopeAnimation({
  onComplete,
  onHeroReveal,
}: EnvelopeAnimationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClickable, setIsClickable] = useState(true);
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleOpenEnvelope = () => {
    if (!isClickable) return;

    setIsClickable(false);
    setShowOpeningAnimation(true);

    setTimeout(() => {
      setIsOpen(true);
    }, 200);

    setTimeout(() => {
      onHeroReveal?.();
    }, 800);

    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-white flex items-center justify-center"
        style={{
          background: showOpeningAnimation
            ? `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 100%)`
            : "white",
        }}
      >
        {/* Full screen envelope */}
        <div className="relative w-full h-full">
          {/* Envelope background - full screen using new palette */}
          <div
            className="absolute inset-0"
            style={{
              background: `
               radial-gradient(120% 80% at 50% 10%, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 40%, transparent 70%),
               linear-gradient(135deg, rgba(0,0,0,0.06) 0%, transparent 45%),
               linear-gradient(225deg, rgba(0,0,0,0.06) 0%, transparent 45%),
               linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02) 30%, transparent 60%),
               linear-gradient(135deg, var(--color-primary) 0%, var(--color-background) 100%)
             `,
            }}
          >
            {/* Fine paper texture */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                background: `repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 6px)`,
              }}
            />
            {/* Left fold shadow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(120deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 12%, transparent 20%)`,
              }}
            />
            {/* Right fold shadow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(-120deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.06) 12%, transparent 20%)`,
              }}
            />

            {/* Top envelope flap - animated opening */}
             <motion.div
               className="absolute top-0 left-0 w-full h-[40%]"
               style={{
                 transformOrigin: "top center",
                 background: `linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0.03))`,
                 clipPath: "polygon(0 0, 100% 0, 50% 100%, 0 0)",
                 boxShadow: "0 6px 14px rgba(0,0,0,0.04) inset",
               }}
               animate={
                 showOpeningAnimation
                   ? {
                       rotateX: [0, -120],
                     }
                   : {}
               }
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
          </div>

          {/* Central seal - aligned with flap's point */}
          <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
              animate={{
                scale: isClickable
                  ? [1, 1.05, 1]
                  : showOpeningAnimation
                  ? [1, 0.8, 0]
                  : 1,
                boxShadow: isClickable
                  ? [
                      "0 8px 16px rgba(0,0,0,0.2)",
                      "0 12px 24px rgba(0,0,0,0.3)",
                      "0 8px 16px rgba(0,0,0,0.2)",
                    ]
                  : showOpeningAnimation
                  ? "0 8px 16px rgba(0,0,0,0.2)"
                  : "0 8px 16px rgba(0,0,0,0.2)",
                opacity: showOpeningAnimation ? [1, 0.7, 0] : 1,
              }}
              transition={{
                scale: isClickable
                  ? {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }
                  : showOpeningAnimation
                  ? { duration: 0.8, ease: "easeInOut", delay: 0.1 }
                  : { duration: 0.3 },
                boxShadow: isClickable
                  ? {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }
                  : { duration: 0.3 },
                opacity: showOpeningAnimation
                  ? { duration: 0.8, ease: "easeInOut", delay: 0.1 }
                  : { duration: 0.3 },
              }}
              onClick={handleOpenEnvelope}
            >
              <Image
                src="/avion-1.png"
                alt="Abrir invitación"
                width={0}
                height={0}
                style={{ width: "110px", height: "auto" }}
                className="object-contain ml-1"
                priority
              />
            </motion.div>
          </div>

          {/* Instructions - aligned with seal */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
            <motion.p
              animate={
                showOpeningAnimation
                  ? { opacity: 0 }
                  : { opacity: [0.5, 1, 0.5] }
              }
              transition={
                showOpeningAnimation
                  ? { duration: 0.3, ease: "easeOut" }
                  : { duration: 1.5, repeat: Number.POSITIVE_INFINITY }
              }
              className="text-white font-wedding-sans text-base md:text-xl drop-shadow-lg"
            >
              Haz clic en el sello para abrir la invitación
            </motion.p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
