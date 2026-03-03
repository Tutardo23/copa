"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { sanity } from "../lib/sanity";
import { CaretLeft, CaretRight, Sparkle } from "phosphor-react";

export default function Testimonios() {
  const [casos, setCasos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  // Mantenemos tu conexión a Sanity intacta
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
    `).then(setCasos);
  }, []);

  const tratamientos = [...new Set(casos.map((c) => c.tratamiento))];
  const filtrados = seleccionado ? casos.filter((c) => c.tratamiento === seleccionado) : casos;

  return (
    <section id="testimonios" className="relative py-24 md:py-32 px-6 w-full bg-[#FAFCFF] overflow-hidden border-t border-slate-100/50">
      
      {/* 🚀 SEO TÉCNICO INVISIBLE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "Carilo Consultorio Odontológico",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Tratamientos Odontológicos y Casos de Éxito",
              "itemListElement": casos.map((c, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "MedicalTherapy",
                  "name": c.titulo,
                  "description": c.descripcion
                }
              }))
            }
          })
        }}
      />

      {/* --- FONDOS DE CONTINUIDAD --- */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: 'radial-gradient(#3CD2D4 1.5px, transparent 1.5px)',
          backgroundSize: '48px 48px'
        }}
      />
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[#3CD2D4]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-[#1E5AA8]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        {/* ENCABEZADO PREMIUM */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-[#3CD2D4]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#3CD2D4]">
              Casos Clínicos
            </span>
            <span className="h-[1px] w-8 bg-[#3CD2D4]" />
          </div>
          
          <h2 className="font-sans text-4xl md:text-5xl font-black text-[#0B1220] tracking-tight leading-[1.15] mb-6">
            Tratamientos con <span className="text-[#3CD2D4]">Resultados Visibles.</span>
          </h2>
          
          <p className="text-slate-500 font-inter text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Explorá el antes y después de nuestros pacientes. Aplicamos tecnología de precisión para devolver la funcionalidad y la estética a cada sonrisa.
          </p>
        </motion.div>

        {casos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Sparkle size={48} weight="duotone" className="text-[#3CD2D4] mb-4 opacity-50" />
            <p className="text-slate-400 font-inter text-lg">
              Próximamente vas a poder ver los resultados reales de nuestros pacientes.
            </p>
          </div>
        ) : (
          <>
            {/* FILTROS DE ALTA GAMA (Estilo Pestañas de Cristal) */}
            <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
              <button
                onClick={() => setSeleccionado(null)}
                className={`px-6 py-2.5 rounded-full font-inter text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  seleccionado === null 
                    ? 'bg-[#0B1220] text-white shadow-lg' 
                    : 'bg-white text-slate-500 hover:text-[#0B1220] border border-slate-200 hover:border-slate-300'
                }`}
              >
                Todos
              </button>
              {tratamientos.map((trat) => (
                <button
                  key={trat}
                  onClick={() => setSeleccionado(trat)}
                  className={`px-6 py-2.5 rounded-full font-inter text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    seleccionado === trat 
                      ? 'bg-[#3CD2D4] text-[#0B1220] shadow-lg shadow-cyan-900/10' 
                      : 'bg-white text-slate-500 hover:text-[#3CD2D4] border border-slate-200 hover:border-cyan-100'
                  }`}
                >
                  {trat}
                </button>
              ))}
            </div>

            {/* CARRUSEL DE CASOS */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CarruselCards casos={filtrados} />
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

function CarruselCards({ casos }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    // Adaptamos el scroll al tamaño de las tarjetas nuevas
    const scrollAmount = window.innerWidth > 768 ? 600 : 320;
    el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full group/carousel">
      
      {/* Botones de Navegación Premium (Se muestran en hover en desktop) */}
      {casos.length > 2 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0B1220] shadow-[0_10px_30px_rgba(11,18,32,0.1)] border border-slate-100 opacity-0 md:group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110 hover:text-[#3CD2D4]"
          >
            <CaretLeft size={24} weight="bold" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0B1220] shadow-[0_10px_30px_rgba(11,18,32,0.1)] border border-slate-100 opacity-0 md:group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110 hover:text-[#3CD2D4]"
          >
            <CaretRight size={24} weight="bold" />
          </button>
        </>
      )}

      {/* Contenedor del Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 pt-4 px-4 -mx-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <AnimatePresence mode="popLayout">
          {casos.map((caso) => (
            <motion.div
              key={caso._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="w-[90vw] md:w-[45vw] lg:w-[400px] flex-shrink-0 snap-center"
            >
              <CardCaso caso={caso} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CardCaso({ caso }) {
  const [ver, setVer] = useState('antes');
  const galeriaRef = useRef(null);

  return (
    <article className="relative rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 bg-white h-full flex flex-col hover:shadow-[0_20px_50px_rgba(60,210,212,0.1)] hover:border-[#3CD2D4]/20 transition-all duration-500">
      
      {/* Contenedor de Imagen y Toggle Interactivo */}
      <div className="relative w-full aspect-[4/3] bg-slate-100 p-2">
        
        {/* Toggle Switch Flotante (Estilo App Nativa) */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex bg-white/90 backdrop-blur-md rounded-full p-1 shadow-md border border-white/50 w-3/4 max-w-[200px]">
          <button
            onClick={() => setVer('antes')}
            className={`flex-1 rounded-full py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              ver === 'antes' ? 'bg-[#0B1220] text-white shadow-sm' : 'text-slate-500 hover:text-[#0B1220]'
            }`}
          >
            Antes
          </button>
          <button
            onClick={() => setVer('despues')}
            className={`flex-1 rounded-full py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              ver === 'despues' ? 'bg-[#3CD2D4] text-[#0B1220] shadow-sm' : 'text-slate-500 hover:text-[#3CD2D4]'
            }`}
          >
            Después
          </button>
        </div>

        {/* Imagen Dinámica */}
        <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
          <Image
            src={ver === 'antes' ? caso.imgAntes : caso.imgDespues}
            alt={`Resultado clínico: ${caso.titulo}`}
            fill
            className="object-cover object-center transition-opacity duration-500"
          />
        </div>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-8 flex flex-col flex-grow">
        
        <span className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] text-[#3CD2D4] mb-2 block">
          {caso.tratamiento}
        </span>
        
        <h3 className="font-sans text-xl md:text-2xl font-bold text-[#0B1220] tracking-tight mb-3">
          {caso.titulo}
        </h3>

        {caso.descripcion && (
          <p className="font-inter text-sm text-slate-500 leading-relaxed flex-grow">
            {caso.descripcion}
          </p>
        )}

        {/* Galería Adicional (Si existe) */}
        {caso.galeria?.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
              Imágenes del proceso
            </span>
            <div
              ref={galeriaRef}
              className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {caso.galeria.map((img) => (
                <div key={img._key} className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden snap-center border border-slate-100">
                  <Image
                    src={img.url}
                    alt={img.caption || `Detalle del caso`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}