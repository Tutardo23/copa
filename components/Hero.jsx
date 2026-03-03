"use client";



import React from "react";

import { motion } from "framer-motion";

import { CalendarPlus, ArrowDown } from "phosphor-react";



// Animaciones fluidas y modernas

const fadeUp = {

  hidden: { opacity: 0, y: 30 },

  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }

};



const staggerContainer = {

  hidden: { opacity: 0 },

  show: {

    opacity: 1,

    transition: { staggerChildren: 0.2, delayChildren: 0.2 }

  }

};



export default function Hero() {

  return (

    <section className="relative w-full h-[100dvh] flex flex-col justify-center items-center overflow-hidden bg-black text-white">

     

      {/* 1. VIDEO DE FONDO: Protagonista absoluto */}

      <video

        autoPlay

        loop

        muted

        playsInline

        className="absolute inset-0 w-full h-full object-cover z-0"

        poster="/poster.jpg"

      >

        <source src="/dentista.mp4" type="video/mp4" />

      </video>



      {/* 2. OVERLAY CINEMATOGRÁFICO: Solo oscurece lo necesario para leer el texto, sin tapar el video */}

      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-[#0B1220]/90" />



      {/* 3. CONTENIDO CENTRAL */}

      <motion.div

        className="relative z-20 w-full max-w-5xl px-6 flex flex-col items-center text-center mt-10"

        variants={staggerContainer}

        initial="hidden"

        animate="show"

      >

        {/* Etiqueta superior sutil */}

        <motion.div variants={fadeUp} className="mb-6 flex items-center gap-3">

            <span className="h-[1px] w-8 bg-[#3CD2D4]"></span>

            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#3CD2D4] font-bold">

              Yerba Buena · Tucumán

            </p>

            <span className="h-[1px] w-8 bg-[#3CD2D4]"></span>

        </motion.div>



        {/* Título Principal (Combinando serif y sans-serif para impacto visual) */}

        <motion.h1 variants={fadeUp} className="flex flex-col items-center justify-center leading-none mb-6">

          <span className="font-playfair text-6xl md:text-[8rem] font-bold text-white tracking-tight drop-shadow-2xl">

            Carilo

          </span>

          <span className="font-inter text-xl md:text-3xl font-light tracking-[0.4em] text-white/80 uppercase mt-2 md:mt-0">

            Consultorio

          </span>

        </motion.h1>



        {/* Slogan */}

        <motion.p variants={fadeUp} className="max-w-2xl text-base md:text-xl font-light text-white/90 leading-relaxed mb-10 drop-shadow-md">

          Odontología con un enfoque <strong className="text-white font-medium">humano, profesional y estético</strong>. <br className="hidden md:block"/>

          Diseñamos tu sonrisa con tecnología de vanguardia.

        </motion.p>



        {/* CTA: Botón Glassmorfismo sutil, no compite con el video */}

        <motion.div variants={fadeUp}>

          <a

            href="#reserva"

            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300"

          >

            <CalendarPlus size={20} weight="duotone" className="text-white group-hover:text-[#3CD2D4] transition-colors" />

            <span>Agendar Turno</span>

          </a>

        </motion.div>

      </motion.div>



      {/* 4. INDICADOR DE SCROLL: Detalle UI premium */}

      <motion.div

        className="absolute bottom-8 z-20 flex flex-col items-center gap-2 text-white/50"

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        transition={{ delay: 1.5, duration: 1 }}

      >

        <span className="text-[9px] uppercase tracking-[0.2em] font-medium">Descubrí más</span>

        <motion.div

            animate={{ y: [0, 6, 0] }}

            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}

        >

            <ArrowDown size={14} weight="bold" />

        </motion.div>

      </motion.div>



    </section>

  );

}