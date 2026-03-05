// app/page.tsx

// ✅ Eliminado: export const dynamic = "force-dynamic"
// Ese flag desactiva el caché de Next.js, aumenta el TTFB y daña Core Web Vitals.
// revalidate = 60 es suficiente para contenido fresco sin sacrificar rendimiento.

export const revalidate = 60;

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Servicios from "../components/Servicios"
import Equipo from "../components/Equipo"
import Testimonios from "../components/Testimonios"
import Contacto from "../components/Contacto"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Servicios />
      <Equipo />
      <Testimonios />
      <Contacto />
      <Footer />
    </>
  )
}