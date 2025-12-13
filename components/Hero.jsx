"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const heroVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 }
  }
};
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};
const sloganVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.1, ease: "easeOut" } }
};

export default function Hero() {
  const [videoCargado, setVideoCargado] = useState(false);

  useEffect(() => {
    const video = document.getElementById("bgVideo");
    if (video) {
      video.oncanplay = () => setVideoCargado(true);
    }
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden select-none">
      {/* Poster visible solo en mobile hasta que cargue el video */}
      {!videoCargado && (
        <img
          src="/poster.jpg"
          alt="Consultorio dental"
          className="absolute inset-0 w-full h-full object-cover md:hidden z-0"
        />
      )}

      {/* Video de fondo (visible en desktop y mobile) */}
      <video
        id="bgVideo"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/poster.jpg"
      >
        <source src="/dentista.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Degradado encima del video */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-[#3CD2D480] z-10" />

      {/* Contenido */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4"
        variants={heroVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-playfair font-bold mb-4 drop-shadow-2xl"
          variants={titleVariants}
        >
          <span className="bg-gradient-to-r text-white text-transparent bg-clip-text drop-shadow-lg">
            Carilo
          </span>{" "}
          <span className="text-white">Consultorio</span>
        </motion.h1>

        <motion.h2
  className="text-base md:text-lg mb-6 font-normal max-w-xl text-center mx-auto"
  variants={sloganVariants}
>
  Atendemos en <strong>Yerba Buena – Tucumán</strong>.<br />
  Consultorio odontológico con enfoque humano, profesional y estético.
</motion.h2>


        <motion.a
          href="#reserva"
          className="px-7 py-3 bg-[#3CD2D4] hover:bg-[#2db8b9] rounded-full shadow-xl font-bold uppercase tracking-wider text-white text-base md:text-lg outline-none ring-2 ring-[#3CD2D4]/20 focus:ring-4 transition-all duration-200 select-none"
          animate={{ scale: [1, 1.06, 0.96, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          Reserva Ahora
        </motion.a>
      </motion.div>
    </section>
  );
}
