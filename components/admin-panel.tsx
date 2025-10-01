"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase, type RSVPResponse } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Users, UserCheck, Utensils, Lock, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AdminPanel() {
  const [responses, setResponses] = useState<RSVPResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    attending: 0,
    specialMenus: 0
  })
  const { toast } = useToast()

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('admin_authenticated')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
      fetchResponses()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchResponses = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setResponses(data || [])
      
      const total = data?.length || 0
      const attending = data?.filter(r => r.attendance === 'si').length || 0
      const specialMenus = data?.filter(r => r.menu !== 'ninguno').length || 0

      setStats({ total, attending, specialMenus })
    } catch (error) {
      console.error('Error fetching responses:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las respuestas",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    if (!password.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa la contraseña",
        variant: "destructive"
      })
      return
    }

    setAuthLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      setPassword("")
      fetchResponses()
      toast({
        title: "Acceso autorizado",
        description: "Bienvenido al panel de administración",
      })
    } else {
      toast({
        title: "Contraseña incorrecta",
        description: "La contraseña ingresada no es válida",
        variant: "destructive"
      })
    }
    
    setAuthLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    setResponses([])
    setStats({ total: 0, attending: 0, specialMenus: 0 })
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión del panel de administración",
    })
  }

  const exportToCSV = () => {
    const headers = ['Nombre', 'Asistencia', 'Menú Especial', 'Acompañantes', 'Comentarios', 'Fecha']
    const csvContent = [
      headers.join(','),
      ...responses.map(r => [
        `"${r.name}"`,
        r.attendance === 'si' ? 'Sí' : 'No',
        r.menu,
        `"${r.companions || ''}"`,
        `"${r.comments || ''}"`,
        new Date(r.created_at || '').toLocaleDateString('es-AR')
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `rsvp_responses_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-wedding-serif font-bold text-foreground mb-2">
              Acceso Administrativo
            </h1>
            <p className="text-muted-foreground font-wedding-sans">
              Ingresa la contraseña para acceder al panel de RSVP
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password" className="text-sm font-wedding-sans text-muted-foreground">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        placeholder="Ingresa la contraseña"
                        className="pr-10"
                        disabled={authLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        disabled={authLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    onClick={handleLogin}
                    disabled={authLoading || !password.trim()}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {authLoading ? (
                      <>
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                        Verificando...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Acceder
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Cargando respuestas...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-wedding-serif font-bold text-foreground mb-2">
                Panel de Administración - RSVP
              </h1>
              <p className="text-muted-foreground font-wedding-sans">
                Respuestas de confirmación de asistencia
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Lock className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-wedding-sans text-muted-foreground">Total</p>
                  <p className="text-2xl font-wedding-serif font-bold text-foreground">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-wedding-sans text-muted-foreground">Asistirán</p>
                  <p className="text-2xl font-wedding-serif font-bold text-green-600">{stats.attending}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-wedding-sans text-muted-foreground">Menús Especiales</p>
                  <p className="text-2xl font-wedding-serif font-bold text-orange-600">{stats.specialMenus}</p>
                </div>
                <Utensils className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botón de exportar */}
        <div className="mb-6">
          <Button onClick={exportToCSV} className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Exportar a CSV
          </Button>
        </div>

        {/* Lista de respuestas */}
        <div className="space-y-4">
          {responses.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground font-wedding-sans">
                  Aún no hay respuestas de RSVP
                </p>
              </CardContent>
            </Card>
          ) : (
            responses.map((response, index) => (
              <motion.div
                key={response.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-wedding-serif font-semibold text-foreground">
                          {response.name}
                        </h3>
                        <p className="text-sm text-muted-foreground font-wedding-sans">
                          {new Date(response.created_at || '').toLocaleDateString('es-AR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <Badge 
                        variant={response.attendance === 'si' ? 'default' : 'destructive'}
                        className="bg-primary text-primary-foreground"
                      >
                        {response.attendance === 'si' ? 'Asistirá' : 'No Asistirá'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {response.menu !== 'ninguno' && (
                        <div>
                          <p className="text-sm font-wedding-sans text-muted-foreground">Menú Especial:</p>
                          <p className="font-wedding-sans text-foreground capitalize">{response.menu}</p>
                        </div>
                      )}
                      
                      {response.companions && (
                        <div>
                          <p className="text-sm font-wedding-sans text-muted-foreground">Acompañantes:</p>
                          <p className="font-wedding-sans text-foreground">{response.companions}</p>
                        </div>
                      )}
                      
                      {response.comments && (
                        <div className="md:col-span-2">
                          <p className="text-sm font-wedding-sans text-muted-foreground">Comentarios:</p>
                          <p className="font-wedding-sans text-foreground">{response.comments}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
