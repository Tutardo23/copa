"use client";
import { ServicioCard } from "../components/ui/servicio-card";

const servicios = [
  {
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="#3CD2D4" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3m6 0c0-1.657-1.343-3-3-3m0 6a3 3 0 100-6 3 3 0 000 6z"/>
      </svg>
    ),
    titulo: "Limpieza y Prevención Bucal",
    texto: "Controles regulares, limpieza dental profunda y prevención de caries para mantener tu salud bucal óptima en Tucumán."
  },
  {
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="#3CD2D4" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.042 12.042 0 010 6.844L12 14z"/>
      </svg>
    ),
    titulo: "Odontología Estética",
    texto: "Blanqueamientos dentales, carillas estéticas y restauraciones para lograr una sonrisa brillante y natural. Especialistas en estética dental."
  },
  {
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="#3CD2D4" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 01-8 0m8 0a4 4 0 00-8 0"/>
      </svg>
    ),
    titulo: "Ortodoncia y Alineadores Transparentes",
    texto: "Brackets tradicionales y alineadores invisibles para alinear tu sonrisa de forma eficiente y cómoda en Tucumán."
  }
];

export default function Servicios() {
  return (
    <section
      id="servicios"
      className="relative py-20 px-6 md:px-20 bg-white overflow-hidden"
      itemScope
      itemType="https://schema.org/MedicalClinic"
    >
      <meta itemProp="name" content="Carilo Consultorio Odontológico" />
      <meta itemProp="department" content="Odontología" />
      <meta itemProp="address" content="Tucumán, Argentina" />

      {/* Fondo decorativo SVG */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-70">
        <svg width="100%" height="100%" viewBox="0 0 1440 360" className="absolute top-0 left-0">
          <defs>
            <linearGradient id="servicios-grad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#3CD2D4" stopOpacity="0.16" />
              <stop offset="70%" stopColor="#3CD2D4" stopOpacity="0.03" />
            </linearGradient>
          </defs>
          <path
            d="M0,160 Q240,50 560,140 Q900,230 1440,60 L1440,360 L0,360 Z"
            fill="url(#servicios-grad)"
          />
          <ellipse cx="800" cy="300" rx="340" ry="60" fill="#3CD2D4" fillOpacity="0.08" />
          <ellipse cx="220" cy="100" rx="110" ry="35" fill="#3CD2D4" fillOpacity="0.10" />
        </svg>
      </div>

      {/* Título principal */}
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 font-playfair drop-shadow-sm bg-gradient-to-r from-[#3CD2D4] to-[#2db8b9] text-transparent bg-clip-text">
        Nuestros Servicios Odontológicos en Tucumán
      </h2>

      {/* Cards de servicio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {servicios.map((serv, i) => (
          <ServicioCard
            key={i}
            icon={serv.icon}
            titulo={serv.titulo}
            texto={serv.texto}
            color="#3CD2D4"
            itemScope
            itemType="https://schema.org/MedicalTherapy"
            itemProp="medicalSpecialty"
          />
        ))}
      </div>
    </section>
  );
}

