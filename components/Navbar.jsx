"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, CalendarPlus, MapPin, Phone } from "phosphor-react";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "El Equipo", href: "#equipo" },
  { label: "Tratamientos", href: "#testimonios" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 1. Detectar scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Animaciones para el menú mobile
  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 250, damping: 30, staggerChildren: 0.1, delayChildren: 0.1 } 
    },
    exit: { opacity: 0, y: "-10%", transition: { duration: 0.3 } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <>
      {/* HEADER PRINCIPAL (Ahora con z-[60] para estar SIEMPRE arriba de todo) */}
      <header
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "bg-transparent py-5" // Si el menú está abierto, el fondo es transparente para integrarse
            : isScrolled
            ? "bg-[#0B1220]/80 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between">
          
          {/* LOGO (Siempre visible) */}
          <a href="#hero" className="flex items-center gap-1.5 select-none" onClick={() => setMobileMenuOpen(false)}>
            <span className="font-playfair font-bold text-2xl md:text-3xl text-white tracking-wide">
              Carilo
            </span>
            <span className="font-inter font-light text-[10px] md:text-xs text-white/70 uppercase tracking-[0.2em] mt-1 md:mt-2">
              Consultorio
            </span>
          </a>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-inter text-xs uppercase tracking-[0.15em] font-medium text-white/70 hover:text-[#3CD2D4] transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#3CD2D4] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="w-[1px] h-5 bg-white/20 mx-2" />

            <a
              href="#reserva"
              className="group flex items-center gap-2 bg-[#3CD2D4] text-[#0B1220] px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_20px_-5px_rgba(60,210,212,0.4)] hover:scale-105"
            >
              <CalendarPlus size={16} weight="bold" />
              <span>Reserva Online</span>
            </a>
          </nav>

          {/* BOTÓN MOBILE (Hamburguesa / Cerrar) */}
          <button
            aria-label="Alternar menú"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 active:scale-95 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={20} weight="bold" className="text-[#3CD2D4]" />
            ) : (
              <List size={20} weight="bold" />
            )}
          </button>
        </div>
      </header>

      {/* MENÚ FULLSCREEN PARA CELULAR (Ahora con z-[50], por debajo del Header) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-[50] flex flex-col justify-center px-6 h-[100dvh] w-full bg-[#0B1220] md:hidden"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] h-[40vh] w-[40vh] rounded-full bg-[#3CD2D4]/10 blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-center mt-20">
              
              <nav className="flex flex-col gap-6 mb-12">
                {links.map((link) => (
                  <motion.a
                    key={link.href}
                    variants={linkVariants}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-playfair text-4xl text-white/90 hover:text-[#3CD2D4] transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div variants={linkVariants} className="flex flex-col gap-4 border-t border-white/10 pt-8 mb-8">
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin size={20} className="text-[#3CD2D4]" weight="duotone" />
                  <span className="font-inter text-sm font-light">Yerba Buena, Tucumán</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <Phone size={20} className="text-[#3CD2D4]" weight="duotone" />
                  <span className="font-inter text-sm font-light">+54 381 555-5550</span>
                </div>
              </motion.div>

              <motion.div variants={linkVariants} className="mt-auto pb-10">
                <a
                  href="#reserva"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-[#3CD2D4] text-[#0B1220] py-4 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-[0_10px_30px_-10px_rgba(60,210,212,0.5)] active:scale-[0.98] transition-all"
                >
                  <CalendarPlus size={20} weight="fill" />
                  Agendar Turno
                </a>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}