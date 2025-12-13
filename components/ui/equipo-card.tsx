// /components/ui/equipo-card.tsx
"use client";
import { motion } from "framer-motion";
import { cn } from "../lib/util";

export function EquipoCard({
  nombre,
  cargo,
  descripcion,
  imgSrc,
  color = "#1ABC9C"
}: {
  nombre: string;
  cargo: string;
  descripcion: string;
  imgSrc: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.045,
        boxShadow: "0 10px 36px rgba(26,188,156,0.10)",
        borderColor: color,
      }}
      transition={{ type: "spring", duration: 0.6, bounce: 0.20 }}
      viewport={{ once: true, amount: 0.23 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden shadow-lg border border-[#e5e7eb] bg-white/80 backdrop-blur-[2.5px] px-8 py-9 flex flex-col items-center text-center transition"
      )}
    >
      {/* Glow animado */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-[#1ABC9C]/15 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
      <div className="mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mx-auto transition group-hover:ring-4 group-hover:ring-[#1ABC9C]/30">
          <img
            src={imgSrc}
            alt={nombre}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>
      <motion.div
        initial={false}
        whileHover={{
          letterSpacing: "0.06em",
          color: color
        }}
        transition={{ type: "spring", stiffness: 150, damping: 17 }}
      >
        <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-[#1ABC9C] transition-colors">{nombre}</h3>
      </motion.div>
      <div className="text-sm font-medium text-[#1ABC9C] mb-2">{cargo}</div>
      <p className="text-gray-600 text-sm leading-normal">{descripcion}</p>
    </motion.div>
  );
}
