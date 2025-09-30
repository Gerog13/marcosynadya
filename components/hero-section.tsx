"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  heroRevealed?: boolean;
}

export function HeroSection({ heroRevealed = false }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Array de imágenes de casamiento disponibles
  const weddingImages = [
    "/casamiento-1.jpeg",
    "/casamiento-2.jpeg",
    "/casamiento-3.jpeg",
    "/casamiento-4.jpeg",
    "/casamiento-5.jpeg",
    "/casamiento-6.jpeg",
    "/casamiento-7.jpeg",
    "/casamiento-8.jpeg",
    "/casamiento-9.jpeg",
    "/casamiento-10.jpeg",
    "/casamiento-12.jpg",
  ];

  // Trigger animations when hero is revealed (after envelope opens)
  useEffect(() => {
    if (heroRevealed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 800); // Small delay after hero is revealed

      return () => clearTimeout(timer);
    }
  }, [heroRevealed]);

  // Cambiar imagen cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % weddingImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [weddingImages.length]);

  const scrollToCountdown = () => {
    document
      .getElementById("countdown")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/20 py-12 lg:py-16">
      {/* Animated airplane elements in background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating airplane 1 */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 opacity-20 hidden sm:block"
          initial={{ opacity: 0 }}
          animate={
            isVisible
              ? {
                  opacity: 0.2,
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 5, -5, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            opacity: { duration: 1, delay: 0.5 },
            y: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            },
            x: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            },
            rotate: {
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            },
          }}
        >
          <Image
            src="/avion-2.png"
            alt="Flying airplane"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Floating airplane 2 */}
        <motion.div
          className="absolute top-32 right-16 w-12 h-12 opacity-15 hidden sm:block"
          initial={{ opacity: 0 }}
          animate={
            isVisible
              ? {
                  opacity: 0.15,
                  y: [0, -15, 0],
                  x: [0, -8, 0],
                  rotate: [0, -3, 3, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            opacity: { duration: 1, delay: 0.7 },
            y: {
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2.2,
            },
            x: {
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2.2,
            },
            rotate: {
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2.2,
            },
          }}
        >
          <Image
            src="/avion-3.png"
            alt="Flying airplane with heart trail"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Floating airplane 3 */}
        <motion.div
          className="absolute bottom-40 left-20 w-14 h-14 opacity-10 hidden sm:block"
          initial={{ opacity: 0 }}
          animate={
            isVisible
              ? {
                  opacity: 0.1,
                  y: [0, -25, 0],
                  x: [0, 15, 0],
                  rotate: [0, 8, -8, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            opacity: { duration: 1, delay: 0.9 },
            y: {
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 4.2,
            },
            x: {
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 4.2,
            },
            rotate: {
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 4.2,
            },
          }}
        >
          <Image
            src="/avion-2.png"
            alt="Flying airplane"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* Subtle pattern overlay - hidden on mobile */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a7b7a7' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 hidden sm:block" />
      </div>

      {/* Main content with framed couple photo */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-16 lg:gap-20 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-2 font-wedding-sans tracking-wide"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Estás Invitado a Celebrar
            </motion.p>

            <motion.h1
              className="font-wedding-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-10 sm:mb-8 text-balance leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Marcos & Nadya
            </motion.h1>

            <motion.div
              className="w-20 sm:w-24 h-px bg-primary mx-auto lg:mx-0 mb-10 sm:mb-8"
              initial={{ width: 0 }}
              animate={isVisible ? { width: 96 } : { width: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            />

            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 font-wedding-sans leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Una propuesta en el cielo mendocino nos llevó hasta aquí.
              <br className="hidden sm:block" />
              Ahora queremos celebrar contigo.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center px-2 sm:px-0 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <Button
                onClick={scrollToCountdown}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 text-base sm:text-lg font-wedding-sans tracking-wide transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                Agendar la Fecha
              </Button>
              <div className="bg-primary/10 border border-primary/20 text-primary px-4 sm:px-6 py-2 sm:py-1.5 rounded-lg text-base sm:text-lg font-wedding-sans tracking-wide text-center w-full sm:w-auto">
                28 de Febrero, 2026
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Framed couple photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="relative mt-10 lg:mt-0"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              {/* Wedding-style photo frame with decorative elements */}
              <div className="relative">
                {/* Main frame with wedding-style border */}
                <div className="relative rounded-xl overflow-hidden shadow-lg sm:shadow-2xl ring-2 ring-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/30 p-2">
                  {/* Inner decorative border */}
                  <div className="relative aspect-[4/5] rounded-md overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0.9 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={weddingImages[currentImageIndex]}
                          alt="Marcos y Nadya"
                          fill
                          className="object-cover"
                          priority={currentImageIndex === 0}
                        />
                      </motion.div>
                    </AnimatePresence>
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    {/* Image indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {weddingImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? "bg-white scale-125"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Wedding-style decorative elements around the frame */}
                {/* <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 opacity-30"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-primary/40"
                  >
                    <path
                      d="M50 20c-8 0-15 4-20 10-5-6-12-10-20-10-3 0-5 2-5 5 0 3 2 5 5 5 6 0 11 3 15 7 4-4 9-7 15-7s11 3 15 7c4-4 9-7 15-7 3 0 5-2 5-5 0-3-2-5-5-5z"
                      fill="currentColor"
                    />
                    <path
                      d="M50 30c-6 0-12 3-16 8-4-5-10-8-16-8-2 0-4 2-4 4 0 2 2 4 4 4 4 0 8 2 11 5 3-3 7-5 11-5s8 2 11 5c3-3 7-5 11-5 2 0 4-2 4-4 0-2-2-4-4-4z"
                      fill="currentColor"
                    />
                    <circle cx="50" cy="45" r="3" fill="currentColor" />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 opacity-25"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-primary/30"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                  </svg>
                </motion.div> */}

                {/* Subtle wedding bells */}
                {/* <motion.div
                  className="absolute top-1/2 -left-6 w-4 h-4 opacity-20"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-primary/25"
                  >
                    <path
                      d="M50 20c-5 0-10 2-15 5v30c0 8 6 15 15 15s15-7 15-15V25c-5-3-10-5-15-5z"
                      fill="currentColor"
                    />
                    <circle cx="50" cy="15" r="3" fill="currentColor" />
                    <path
                      d="M45 60v10h10V60"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute top-1/3 -right-6 w-5 h-5 opacity-18"
                  animate={{
                    y: [0, -6, 0],
                    rotate: [0, -4, 4, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 4,
                  }}
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-primary/20"
                  >
                    <path
                      d="M50 15c-10 0-18 5-25 12-7-7-15-12-25-12-4 0-7 3-7 7 0 4 3 7 7 7 8 0 14 4 19 9 5-5 11-9 19-9s14 4 19 9c5-5 11-9 19-9 4 0 7-3 7-7 0-4-3-7-7-7z"
                      fill="currentColor"
                    />
                    <path
                      d="M50 25c-7 0-13 4-18 9-5-5-11-9-18-9-3 0-5 2-5 5 0 3 2 5 5 5 6 0 10 3 14 6 4-3 8-6 14-6s10 3 14 6c4-3 8-6 14-6 3 0 5-2 5-5 0-3-2-5-5-5z"
                      fill="currentColor"
                    />
                    <circle cx="50" cy="40" r="4" fill="currentColor" />
                  </svg>
                </motion.div> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="cursor-pointer"
          onClick={scrollToCountdown}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground/70 hover:text-muted-foreground transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}
