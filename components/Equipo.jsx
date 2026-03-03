"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, GraduationCap, Star } from "phosphor-react";

// Tu texto original intacto.
const equipo = [
  {
    nombre: "Dr. Juan Luis Micoli",
    especialidad: "Odontología Integral y Rehabilitación",
    experiencia: [
      "Más de 20 años de trayectoria en el ámbito público y privado.",
      "Especialista en ortodoncia, estética dental, prótesis y rehabilitaciones complejas.",
      "Acompañó a cientos de pacientes y familias en Tucumán con un enfoque preventivo, funcional y estético."
    ],
    formacion: "Odontólogo. Especializaciones en ortodoncia, estética dental y rehabilitación oral.",
    descripcion: "Tratamientos integrales con enfoque humano y compromiso profesional.",
    valores: "Prevención, confianza, excelencia clínica.",
    imgSrc: "/equipo/juan-micoli.jpg"
  },
  {
    nombre: "Dra. María Luz Graña",
    especialidad: "Prótesis y Estética Dental",
    experiencia: [
      "Desde joven atraída por la combinación de ciencia y arte en la odontología.",
      "Con años de experiencia en estética dental, con especialidad en figuras públicas.",
      "Reconocida como 'la odontóloga de las estrellas'."
    ],
    formacion: "Odontóloga (UNT). Especialización en odontología estética, escaneo 3D y diseño digital de sonrisas.",
    descripcion: "Ayuda a las personas a sentirse más seguras a través de una sonrisa saludable y estéticamente perfecta.",
    valores: "Confidencialidad, precisión, empatía y excelencia clínica.",
    imgSrc: "/equipo/luz-grana.jpg"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Equipo() {
  return (
    // Fondo principal en blanco puro para contrastar con la sección anterior
    <section id="equipo" className="relative py-20 md:py-32 px-6 w-full bg-white overflow-hidden">
      
      {/* 🚀 Script SEO Oculto (Mantenido y optimizado) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "Carilo Consultorio Odontológico",
            "employee": equipo.map(doc => ({
              "@type": "Physician",
              "name": doc.nombre,
              "medicalSpecialty": doc.especialidad
            }))
          })
        }}
      />

      {/* --- TRANSICIÓN DE SECCIÓN Y FONDOS SUTILES --- */}
      {/* 1. Degradado superior para fundir con la sección anterior (#FAFCFF) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAFCFF] to-transparent z-0" />
      {/* 2. Línea divisoria elegante */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#3CD2D4]/20 to-transparent z-0" />

      {/* 3. Textura de puntos (Continuidad) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.2]"
        style={{
          backgroundImage: 'radial-gradient(#3CD2D4 1.5px, transparent 1.5px)',
          backgroundSize: '48px 48px'
        }}
      />

      {/* 4. Marca de agua tipográfica y brillos sutiles (Para no sentir vacío) */}
      <div className="absolute top-[5%] right-[-5%] z-0 select-none pointer-events-none opacity-[0.02]">
        <h2 className="font-sans font-black text-[8rem] md:text-[14rem] leading-none whitespace-nowrap text-[#0B1220] tracking-tighter">
          EL EQUIPO
        </h2>
      </div>
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#3CD2D4]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#1E5AA8]/5 rounded-full blur-[120px] pointer-events-none z-0" />


      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* ENCABEZADO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-[1px] w-8 bg-[#3CD2D4]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[#3CD2D4]">
              Dirección Médica
            </span>
            <span className="h-[1px] w-8 bg-[#3CD2D4]" />
          </div>
          <h2 className="font-sans text-4xl md:text-5xl font-extrabold text-[#0B1220] tracking-tight leading-[1.15] mb-6">
            Nuestro Equipo de Odontólogos en <span className="text-[#3CD2D4]">Tucumán.</span>
          </h2>
          <p className="text-slate-600 font-inter text-base max-w-3xl mx-auto leading-relaxed">
            En <strong className="font-bold text-[#0B1220]">Carilo Consultorio Odontológico</strong> contamos con un equipo certificado, especializado en rehabilitación oral y estética dental. Eleginos para cuidar tu sonrisa.
          </p>
        </motion.div>

        {/* TARJETAS */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-16 md:gap-20"
        >
          {equipo.map((miembro, i) => (
            <motion.article 
              key={i}
              variants={cardVariants}
              className={`group relative flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-0`}
            >
              
              {/* IMAGEN DEL DOCTOR (Ahora más pequeña y enmarcada) */}
              <div className="w-full md:w-4/12 shrink-0 relative z-10">
                {/* Marco blanco alrededor de la foto para darle formato de retrato */}
                <div className="relative w-full aspect-[4/5] rounded-[2rem] bg-white p-2 md:p-3 shadow-lg border border-slate-100">
                  <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-100">
                    <img 
                      src={miembro.imgSrc} 
                      alt={miembro.nombre} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                  </div>
                </div>
              </div>

              {/* CONTENIDO DE LA TARJETA */}
              {/* Ajustamos el ancho al 8/12 y reducimos un poco el margen negativo de superposición */}
              <div className={`w-full md:w-8/12 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 md:p-12 relative z-20 md:-mt-6 ${i % 2 === 0 ? 'md:-ml-10' : 'md:-mr-10'}`}>
                
                <h3 className="font-sans text-3xl md:text-4xl font-extrabold text-[#0B1220] tracking-tight mb-2">
                  {miembro.nombre}
                </h3>
                <h4 className="font-inter text-sm font-bold uppercase tracking-widest text-[#3CD2D4] mb-4">
                  {miembro.especialidad}
                </h4>
                
                <p className="text-slate-500 font-inter text-sm italic border-l-2 border-[#3CD2D4]/30 pl-4 mb-6 leading-relaxed">
                  "{miembro.descripcion}"
                </p>

                <ul className="flex flex-col gap-3 mb-8">
                  {miembro.experiencia.map((exp, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#3CD2D4]/10 shrink-0 mt-0.5">
                        <CheckCircle size={14} weight="fill" className="text-[#3CD2D4]" />
                      </div>
                      <span className="font-inter text-slate-700 text-sm md:text-base leading-relaxed">
                        {exp}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-4 p-5 bg-[#FAFCFF] rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <GraduationCap size={20} weight="duotone" className="text-[#0B1220] shrink-0 mt-0.5" />
                    <p className="font-inter text-sm text-slate-600 leading-relaxed">
                      <strong className="text-[#0B1220] font-bold">Formación:</strong> {miembro.formacion}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star size={20} weight="duotone" className="text-[#3CD2D4] shrink-0 mt-0.5" />
                    <p className="font-inter text-sm text-slate-600 leading-relaxed">
                      <strong className="text-[#0B1220] font-bold">Valores:</strong> {miembro.valores}
                    </p>
                  </div>
                </div>

              </div>

            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}