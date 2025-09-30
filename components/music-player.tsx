"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MusicPlayerProps {
  isVisible: boolean
}

export function MusicPlayer({ isVisible }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3) // Volumen inicial más bajo
  const audioRef = useRef<HTMLAudioElement>(null)

  // Autoplay cuando se hace visible
  useEffect(() => {
    if (isVisible && audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.warn("Autoplay prevented:", error)
          // Si el autoplay falla, el usuario puede hacer clic en el botón para reproducir
        })
    } else if (!isVisible && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [isVisible, volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }


  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/music/wedding-theme.mp3" type="audio/mpeg" />
        <source src="/music/wedding-theme.ogg" type="audio/ogg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      {/* Simple play/pause button */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-40"
          >
            <Button
              size="icon"
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-md hover:bg-primary/30 transition-all duration-200"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary" />
              ) : (
                <Play className="w-5 h-5 text-primary" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
