import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

/* rutas que se utilizarán en el sidebar :) */
export const routes = [
    {
      title: "Tu menú ",
      url: "/dashboard/profile",
      icon: Inbox,
    },
    {
      title: "Acciones",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Métricas",
      url: "#",
      icon: Search,
    },
    {
      title: "Configuraciones avanzadas",
      url: "#",
      icon: Settings,
    },
  ]