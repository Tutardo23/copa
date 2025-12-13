"use client";
import { useState } from "react";
import { motion } from "framer-motion";

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
    imgSrc: "/equipo/juan-micoli.jpg",
    seo: "Odontólogo Tucumán, ortodoncia, estética dental, prótesis, rehabilitación integral"
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
    imgSrc: "/equipo/luz-grana.jpg",
    seo: "Estética dental, celebridades, diseño de sonrisa, escaneo 3D, carillas, Tucumán"
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.22, type: "spring", duration: 0.8, bounce: 0.17 }
  })
};

export default function Equipo() {
  return (
    <section id="equipo" className="relative py-24 px-6 md:px-20 bg-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <svg width="100%" height="100%" viewBox="0 0 1440 320">
          <path fill="#3CD2D4" fillOpacity="0.13" d="M0,240 Q320,80,700,220 Q900,300,1440,140 L1440,320 L0,320 Z"/>
        </svg>
      </div>

      <div className="max-w-3xl mx-auto mb-16 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair bg-gradient-to-r from-[#3CD2D4] to-[#23a8aa] text-transparent bg-clip-text drop-shadow">
          Nuestro Equipo de Odontólogos en Tucumán
        </h2>
        <p className="text-lg text-gray-700 font-medium leading-relaxed">
          En <span className="font-bold text-[#3CD2D4]">Carilo Consultorio Odontológico</span> contamos con un equipo de <b>odontólogos certificados</b> en <b>Tucumán</b>, especializados en <b>rehabilitación oral</b> y <b>estética dental</b>. Eleginos para cuidar tu sonrisa con el mejor equipo profesional y humano.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-10 max-w-6xl mx-auto relative z-10">
        {equipo.map((m, i) => (
          <FlipCard key={i} miembro={m} index={i} />
        ))}
      </div>

      <div className="mt-20 max-w-2xl mx-auto text-center z-10 relative">
        <p className="text-base text-[#3CD2D4] font-medium">
          Buscá odontólogos certificados en Tucumán, expertos en rehabilitación oral y estética dental. Tu mejor sonrisa comienza aquí.
        </p>
      </div>
    </section>
  );
}

function FlipCard({ miembro, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      className="group perspective-1000 w-full flex justify-center"
      style={{ minHeight: 440 }}
      tabIndex={0}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
    >
      <div className={`relative w-full max-w-xs h-[390px] transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 rounded-3xl shadow-xl border border-[#3CD2D4]/30 px-8 py-8 backface-hidden">
          <img src={miembro.imgSrc} alt={`${miembro.nombre}, ${miembro.especialidad}`} className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg mb-5" draggable={false} loading="lazy" />
          <h3 className="text-xl font-bold text-[#23a8aa] mb-1 group-hover:text-[#3CD2D4] transition">{miembro.nombre}</h3>
          <div className="font-semibold text-[#3CD2D4] mb-2">{miembro.especialidad}</div>
          <div className="text-gray-600 text-sm italic mb-3">"{miembro.descripcion}"</div>
          <button className="mt-4 px-4 py-2 rounded-full bg-[#3CD2D4] text-white font-semibold text-sm shadow hover:bg-[#23a8aa] transition" onClick={() => setFlipped(true)} tabIndex={-1} aria-label={`Ver información de ${miembro.nombre}`}>
            Ver más info
          </button>
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 rounded-3xl shadow-xl border border-[#3CD2D4]/50 px-8 py-8 [transform:rotateY(180deg)] backface-hidden text-sm">
          <div className="font-semibold text-[#3CD2D4] mb-2">{miembro.especialidad}</div>
          {miembro.experiencia.map((exp, i) => (
            <div key={i} className="text-gray-700 mb-2 text-left w-full">
              <span className="font-bold">•</span> {exp}
            </div>
          ))}
          <div className="text-gray-500 mb-1 text-left w-full">
            <span className="font-bold">Formación:</span> {miembro.formacion}
          </div>
          <div className="text-gray-600 text-left w-full">
            <span className="font-bold">Valores:</span> {miembro.valores}
          </div>
          <span className="hidden">{miembro.seo}</span>
          <button className="mt-6 mx-auto px-4 py-2 rounded-full bg-[#e3f7f7] text-[#3CD2D4] font-semibold text-sm shadow hover:bg-[#3CD2D4]/20 transition" onClick={() => setFlipped(false)} tabIndex={-1} aria-label={`Volver a ver la foto de ${miembro.nombre}`}>
            Volver
          </button>
        </div>
      </div>
    </motion.article>
  );
}
