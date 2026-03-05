"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkle, MagicWand, ArrowRight } from "phosphor-react";

const servicios = [
  {
    icon: ShieldCheck,
    titulo: "Prevención y Limpieza",
    texto: "Controles regulares y limpieza profunda para mantener tu salud bucal óptima y prevenir caries desde la base.",
    link: "#reserva",
  },
  {
    icon: Sparkle,
    titulo: "Odontología Estética",
    texto: "Blanqueamientos, carillas y restauraciones de alta gama para lograr una sonrisa brillante, armónica y 100% natural.",
    link: "#reserva",
  },
  {
    icon: MagicWand,
    titulo: "Ortodoncia Invisible",
    texto: "Alineamos tu sonrisa de forma discreta con alineadores transparentes de última generación y ortodoncia tradicional.",
    link: "#reserva",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export default function Servicios() {
  return (
    <section
      id="servicios"
      // 1. OVERLAP SUTIL: Usamos un padding top más alto, pero la sección en sí no corta de golpe.
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 w-full bg-[#FAFCFF] overflow-hidden flex justify-center"
    >
      {/* =========================================
          EL PUENTE VISUAL (Transición Hero -> Servicios)
          ========================================= */}
      {/* Degradado oscuro que viene desde arriba para fundirse con el Hero */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#0B1220] via-[#0B1220]/20 to-transparent z-10 pointer-events-none" />

      {/* =========================================
          CAPAS DE FONDO (Textura de la captura 2)
          ========================================= */}
      {/* Textura de puntos cyan */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: 'radial-gradient(#3CD2D4 1.5px, transparent 1.5px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* Marca de agua GIGANTE exacta a tu diseño */}
      <div className="absolute top-[5%] left-[-2%] z-0 select-none pointer-events-none opacity-[0.03]">
        <h2 className="font-sans font-black text-[12rem] md:text-[18rem] leading-none whitespace-nowrap text-[#0B1220] tracking-tighter">
          ODONTOLOGÍA
        </h2>
      </div>

      {/* =========================================
          CONTENIDO PRINCIPAL
          ========================================= */}
      <div className="relative z-20 w-full max-w-7xl">
        
        {/* Encabezado calcado a tu estética */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="h-[1px] w-12 bg-[#3CD2D4]" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#3CD2D4]">Especialidades</span>
            </div>
            {/* Tipografía Sans-Serif gruesa, igual a la de la foto */}
            <h2 className="font-sans text-4xl md:text-6xl font-extrabold text-[#0B1220] tracking-tight leading-[1.1]">
              Servicios Odontológicos <br/>
              en <span className="text-[#3CD2D4]">Yerba Buena, Tucumán.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-slate-500 font-inter text-sm md:text-base max-w-xs leading-relaxed border-l-[1px] border-slate-300 pl-5">
              Estética dental, ortodoncia y rehabilitación oral con tecnología de vanguardia en Yerba Buena.
            </p>
          </motion.div>
        </div>

        {/* Grilla de Tarjetas (Idénticas a tu diseño) */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {servicios.map((serv, i) => {
            const Icon = serv.icon;
            return (
              <motion.div 
                key={i}
                variants={cardVariants}
                className="group relative flex flex-col bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(60,210,212,0.1)] transition-all duration-500 overflow-hidden border border-white hover:border-[#3CD2D4]/20"
              >
                {/* Reflejo circular cyan en la esquina superior derecha */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-[#3CD2D4]/10 to-transparent rounded-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                {/* Ícono con el bloque oscuro que diseñaste */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0B1220] text-white shadow-md mb-8 relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon size={26} weight="duotone" />
                </div>

                <h3 className="font-sans text-xl md:text-2xl font-bold text-[#0B1220] mb-3 relative z-10">
                  {serv.titulo}
                </h3>
                
                <p className="font-inter text-sm text-slate-500/90 leading-relaxed mb-8 flex-grow relative z-10">
                  {serv.texto}
                </p>

                <a 
                  href={serv.link} 
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#0B1220] group-hover:text-[#3CD2D4] transition-colors mt-auto w-fit relative z-10"
                >
                  Conocer Más
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}