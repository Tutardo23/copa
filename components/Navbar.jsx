"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Inicio", href: "#hero" },
  { label: "Servicios", href: "#servicios" },
  { label: "Equipo", href: "#equipo" },
  { label: "Tratamientos", href: "#testimonios" },
  { label: "Reserva online", href: "#reserva" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Animaciones desktop
  const desktopMenuVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } }
  };
  const desktopItem = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0 }
  };

  // Animaciones mobile
  const mobileDrawerVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { type: "spring", stiffness: 330, damping: 28 } }
  };
  const mobileLinkVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.09 * i }
    }),
  };

  return (
    <>
      {/* NAVBAR SUPERIOR */}
      <nav className="fixed top-0 left-0 w-full bg-[#3CD2D4]/90 px-6 py-4 flex items-center justify-between z-50 shadow-md transition-colors">
        {/* LOGO */}
        <div className="font-serif font-bold text-2xl text-white select-none">
          <span className="text-white drop-shadow-lg">Carilo</span>
          <span className="text-white drop-shadow-lg">Consultorio</span>
        </div>
        {/* BOTÓN UNIVERSAL */}
        <button
          aria-label="Abrir menú"
          className="text-white focus:outline-none ml-4 rounded-full hover:bg-white/10 p-1 transition"
          onClick={() => setMenuOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8 2 4 4.5 4 8c0 3.75 2 5.5 2 9 0 2.5 1.5 5 6 5s6-2.5 6-5c0-3.5 2-5.25 2-9 0-3.5-4-6-8-6z" />
          </svg>
        </button>
      </nav>

      {/* MENÚ DESKTOP ANIMADO */}
      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="hidden md:flex fixed top-20 left-1/2 -translate-x-1/2 bg-white/95 rounded-xl shadow-xl px-10 py-4 z-50 space-x-8 items-center font-bold"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={desktopMenuVariants}
            style={{ backdropFilter: "blur(12px)" }}
          >
            {/* Botón cerrar */}
            <li>
              <button
                aria-label="Cerrar menú"
                className="text-[#3CD2D4] font-bold mr-4 hover:bg-[#3CD2D4]/10 rounded-full p-2 transition"
                onClick={() => setMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </li>
            {links.map((l, i) => (
  <motion.li key={l.href} variants={desktopItem}>
    <a
      href={l.href}
      className={`text-[#23a8aa] transition-colors duration-200 hover:text-[#3CD2D4] px-2 whitespace-nowrap ${
        i === links.length - 1 ? 'ml-2 pl-2 font-semibold' : ''
      }`}
      onClick={() => setMenuOpen(false)}
    >
      {l.label}
    </a>
  </motion.li>
))}

          </motion.ul>
        )}
      </AnimatePresence>

      {/* DRAWER MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl rounded-l-2xl p-4 flex flex-col z-50 md:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileDrawerVariants}
          >
            <button
              aria-label="Cerrar menú"
              className="self-end focus:outline-none mb-2 rounded-full bg-[#e3f7f7] hover:bg-[#3CD2D4]/30 p-2 transition"
              onClick={() => setMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#3CD2D4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <nav className="flex flex-col gap-2 mt-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  className="text-[#3CD2D4] bg-[#e3f7f7] hover:bg-[#3CD2D4]/90 hover:text-white text-base font-bold rounded-lg px-4 py-2 shadow-sm transition-all border border-[#3CD2D4]/30"
                  onClick={() => setMenuOpen(false)}
                  variants={mobileLinkVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}





