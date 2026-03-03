"use client";

import React from "react";
import { InstagramLogo, WhatsappLogo, Lightning } from "phosphor-react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0B1220] border-t border-slate-100/10 py-12 px-6 overflow-hidden">
      
      {/* Brillo sutil de fondo para que no sea un negro plano */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[#3CD2D4]/5 rounded-full blur-[80px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* 1. LOGO */}
        <a href="#hero" className="flex items-center gap-3 select-none group">
          <div className="flex items-center justify-center p-2.5 bg-white/5 border border-white/10 rounded-full shadow-lg group-hover:bg-[#3CD2D4] group-hover:border-[#3CD2D4] transition-all duration-300">
            <svg
              className="w-5 h-5 text-[#3CD2D4] group-hover:text-[#0B1220] transition-colors"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                d="M8 20c1-6-2-12 8-12s7 6 8 12-2 10-4 10-2-6-4-6-2 6-4 6-5-4-4-10z"
                fill="currentColor"
              />
              <circle cx="10" cy="13" r="2" fill="#0B1220" opacity="0.6" className="group-hover:fill-white" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-playfair text-2xl font-bold text-white tracking-wide group-hover:text-[#3CD2D4] transition-colors">
              Carilo
            </span>
            <span className="font-inter text-[11px] font-light text-white/60 tracking-[0.2em] uppercase mt-1">
              Consultorio
            </span>
          </div>
        </a>

        {/* 2. MENÚ CENTRAL */}
        <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-white/70 font-inter text-sm">
          <li>
            <a href="#servicios" className="hover:text-[#3CD2D4] transition-colors">
              Servicios
            </a>
          </li>
          <li>
            <a href="#equipo" className="hover:text-[#3CD2D4] transition-colors">
              Equipo
            </a>
          </li>
          <li>
            <a href="#testimonios" className="hover:text-[#3CD2D4] transition-colors">
              Tratamientos
            </a>
          </li>
          <li>
            <a href="#reserva" className="hover:text-[#3CD2D4] transition-colors">
              Reserva online
            </a>
          </li>
        </ul>

        {/* 3. REDES Y CRÉDITOS */}
        <div className="flex flex-col items-center md:items-end gap-4">
          
          {/* Redes Sociales */}
          <div className="flex gap-3">
            <a
              href="https://wa.me/54-381-5555550"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all"
            >
              <WhatsappLogo size={18} weight="fill" />
            </a>
            <a
              href="https://instagram.com/cariloconsultorio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent transition-all"
            >
              <InstagramLogo size={18} weight="fill" />
            </a>
          </div>
          
          {/* Copyright y Firma */}
          <div className="flex flex-col items-center md:items-end gap-1.5 text-center md:text-right">
            <span className="font-inter text-[11px] text-white/40 tracking-wide">
              © {new Date().getFullYear()} Carilo Consultorio. Todos los derechos reservados.
            </span>
            
            {/* Firma Trox (Solo texto, sin etiqueta <a>) */}
            <div className="flex items-center gap-1 font-inter text-[10px] text-white/30 select-none">
              <span>Desarrollo by</span>
              <span className="font-bold text-white/80 flex items-center gap-0.5">
                TROX <Lightning size={10} weight="fill" className="text-[#3CD2D4]" />
              </span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}