'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { sanity } from '/lib/sanity'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Testimonios() {
  const [casos, setCasos] = useState([])
  const [seleccionado, setSeleccionado] = useState(null)

  useEffect(() => {
    sanity.fetch(`
      *[_type == "casoClinico"] | order(_createdAt desc) {
        _id,
        titulo,
        descripcion,
        tratamiento,
        "imgAntes": imagenAntes.asset->url,
        "imgDespues": imagenDespues.asset->url,
        galeria[]{
          _key,
          caption,
          "url": imagen.asset->url
        }
      }
    `).then(setCasos)
  }, [])

  const tratamientos = [...new Set(casos.map(c => c.tratamiento))]
  const filtrados = seleccionado ? casos.filter(c => c.tratamiento === seleccionado) : casos

  return (
    <section className="py-24 px-6 md:px-20 bg-white" id="testimonios">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 font-playfair bg-gradient-to-r from-[#3CD2D4] to-[#23a8aa] text-transparent bg-clip-text drop-shadow">
          Tratamientos Odontológicos con Resultados Visibles
        </h2>

        {casos.length === 0 ? (
          <p className="text-neutral-500 text-lg md:text-xl">
            Próximamente vas a poder ver los <span className="text-[#3CD2D4] font-semibold">resultados reales</span> de nuestros pacientes.
          </p>
        ) : (
          <>
            {/* Filtro por tratamiento */}
            <div className="flex justify-center gap-4 flex-wrap mb-12">
              {tratamientos.map(trat => (
                <button
                  key={trat}
                  onClick={() => setSeleccionado(trat)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all text-sm md:text-base ${
                    seleccionado === trat ? 'bg-[#3CD2D4] text-white shadow-xl' : 'bg-[#e3f7f7] text-[#3CD2D4] hover:bg-[#3CD2D4]/20'
                  }`}
                >
                  {trat}
                </button>
              ))}
              {seleccionado && (
                <button
                  onClick={() => setSeleccionado(null)}
                  className="text-sm underline text-neutral-400"
                >
                  Ver todos
                </button>
              )}
            </div>

            {/* Carrusel de cards */}
            <CarruselCards casos={filtrados} />
          </>
        )}
      </div>
    </section>
  )
}

function CarruselCards({ casos }) {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const scrollAmount = 600
    el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {casos.length > 2 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
          >
            <ChevronLeft className="text-[#3CD2D4]" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
          >
            <ChevronRight className="text-[#3CD2D4]" />
          </button>
        </>
      )}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
      >
        {casos.map((caso) => (
          <div
            key={caso._id}
            className="w-[90%] sm:w-[45%] flex-shrink-0 snap-center"
          >
            <CardCaso caso={caso} />
          </div>
        ))}
      </div>
    </div>
  )
}

function CardCaso({ caso }) {
  const [ver, setVer] = useState('antes')
  const galeriaRef = useRef(null)

  const scroll = (dir) => {
    const el = galeriaRef.current
    if (!el) return
    const scrollAmount = 300
    el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  return (
    <motion.article
      className="relative rounded-3xl overflow-hidden shadow-xl border border-[#3CD2D4]/20 group bg-white h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Imagen principal */}
      <div className="relative w-full aspect-[4/3] bg-white rounded-t-3xl overflow-hidden">
        <Image
          src={ver === 'antes' ? caso.imgAntes : caso.imgDespues}
          alt={`Imagen ${ver === 'antes' ? 'antes' : 'después'} del caso ${caso.titulo}`}
          fill
          className="object-contain"
        />
      </div>

      <div className="p-6 flex flex-col items-center">
        <h3 className="text-lg md:text-xl font-bold text-[#3CD2D4] mb-2 text-center">
          {caso.titulo}
        </h3>

        {/* Subtítulo opcional */}
        {caso.descripcion && (
          <p className="text-sm text-neutral-700 mb-4">{caso.descripcion}</p>
        )}

        {/* Botones antes/después */}
        <div className="flex gap-3 mt-2 mb-4">
          {['antes', 'despues'].map((op) => (
            <button
              key={op}
              onClick={() => setVer(op)}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                ver === op
                  ? 'bg-[#3CD2D4] text-white'
                  : 'bg-[#e3f7f7] text-[#3CD2D4] hover:bg-[#3CD2D4]/20'
              }`}
            >
              {op === 'antes' ? 'Ver Antes' : 'Ver Después'}
            </button>
          ))}
        </div>

        {/* Galería adicional */}
        {caso.galeria?.length > 0 && (
          <div className="mt-4 w-full relative">
            <div
              ref={galeriaRef}
              className="flex gap-4 w-max px-1 snap-x snap-mandatory overflow-x-scroll scroll-smooth"
            >
              {caso.galeria.map((img) => (
                <div
                  key={img._key}
                  className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] snap-center flex-shrink-0"
                >
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow">
                    <Image
                      src={img.url}
                      alt={img.caption || `Imagen adicional del caso ${caso.titulo}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {img.caption && (
                    <p className="mt-2 text-sm text-neutral-600 text-center">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  )
}
