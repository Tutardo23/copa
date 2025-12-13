// app/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const revalidate = 60 // ⏱️ Revalida esta página cada 60 segundos

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

