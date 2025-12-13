// /components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#3CD2D4]/90 shadow-inner border-t border-[#1abc9c]/20 pt-12 pb-7 px-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* LOGO */}
        <a href="/" className="flex items-center gap-3 select-none group">
          <span className="relative flex items-center justify-center p-2 bg-[#1abc9c] rounded-full shadow-xl ring-2 ring-white/30 group-hover:scale-105 transition">
            <svg
              className="w-7 h-7 text-white"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M8 20c1-6-2-12 8-12s7 6 8 12-2 10-4 10-2-6-4-6-2 6-4 6-5-4-4-10z"
                fill="white"
                opacity="0.9"
              />
              <circle cx="10" cy="13" r="2" fill="#fff" opacity="0.6" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xl md:text-2xl font-extrabold text-white tracking-tight drop-shadow-lg">
              Carilo
            </span>
            <span className="text-base md:text-lg font-semibold text-white/90 tracking-wide drop-shadow">
              Consultorio
            </span>
          </span>
        </a>

        {/* MENÚ */}
        <ul className="flex flex-wrap gap-6 text-white/90 font-medium text-base drop-shadow-sm">
          <li>
            <a
              href="#servicios"
              className="hover:text-white hover:underline underline-offset-4 transition"
            >
              Servicios
            </a>
          </li>
          <li>
            <a
              href="#equipo"
              className="hover:text-white hover:underline underline-offset-4 transition"
            >
              Equipo
            </a>
          </li>
          {/* Hemos reemplazado el enlace de “Contacto” por “Reserva online” */}
          <li>
            <a
              href="#reserva"
              className="hover:text-white hover:underline underline-offset-4 transition"
            >
              Reserva online
            </a>
          </li>
          <li>
            <a
              href="#reserva"
              className="hover:text-white hover:underline underline-offset-4 transition"
            >
              Reserva
            </a>
          </li>
        </ul>

        {/* REDES */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-4 mb-1">
            <a
              href="https://wa.me/5493811234567"
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="rounded-full bg-white/20 p-2 shadow-md hover:scale-110 hover:bg-[#25D366] transition group"
            >
              {/* …icono de WhatsApp… */}
            </a>
            {/* …otros iconos… */}
          </div>
          <span className="text-xs text-white/70 tracking-wide drop-shadow">
            © {new Date().getFullYear()} Carilo Consultorio. Todos los derechos
            reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
