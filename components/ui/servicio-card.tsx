// /components/ui/servicio-card.tsx
"use client";
import { motion } from "framer-motion";
import { cn } from "../lib/util";

export function ServicioCard({ icon, titulo, texto, color = "#1ABC9C" }: {
  icon: React.ReactNode,
  titulo: string,
  texto: string,
  color?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        scale: 1.045,
        boxShadow: "0 10px 36px rgba(26, 188, 156, 0.08)"
      }}
      transition={{ type: "spring", duration: 0.7, bounce: 0.22 }}
      viewport={{ once: true, amount: 0.19 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden shadow-lg border border-[#e5e7eb] bg-white/80 backdrop-blur-[2.5px] px-7 py-9 flex flex-col items-center text-center cursor-pointer transition"
      )}
    >
      {/* Efecto halo animado al hover */}
      <span className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#1ABC9C]/20 blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
      {/* Icono con escala animada */}
      <div className="mb-5 flex items-center justify-center">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md border border-[#1ABC9C]/10">
          <motion.span
            whileHover={{ scale: 1.23, rotate: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 13 }}
            className="block"
            style={{ color }}
          >
            {icon}
          </motion.span>
        </span>
      </div>
      {/* Título reveal */}
      <motion.h3
        className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-[#1ABC9C] transition-colors"
        initial={false}
        whileHover={{
          letterSpacing: "0.09em",
          color: "#1ABC9C"
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        {titulo}
      </motion.h3>
      {/* Línea animada */}
      <motion.div
        className="h-1 rounded bg-[#1ABC9C] w-12 mx-auto mb-2 origin-left"
        initial={{ scaleX: 0.4, opacity: 0.2 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
      />
      <p className="text-gray-600 text-base leading-snug">{texto}</p>
    </motion.div>
  );
}
