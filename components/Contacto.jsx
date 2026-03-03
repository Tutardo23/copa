"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarPlus, 
  WhatsappLogo, 
  User, 
  Phone, 
  CalendarBlank, 
  Clock, 
  PaperPlaneRight, 
  CheckCircle,
  MapPin
} from "phosphor-react";

// --------- LÓGICA FECHAS Y HORARIOS ---------
function getTodayISO() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split("T")[0];
}

function getHorariosParaFecha(fecha) {
  if (!fecha) return [];
  const d = new Date(fecha + "T00:00");
  const dia = d.getDay();
  if (dia === 0) return []; 
  let desde = 9, hasta = 21;
  if (dia === 6) hasta = 13; 
  const horas = [];
  for (let h = desde; h < hasta; h++) {
    horas.push(`${h.toString().padStart(2, "0")}:00`);
    horas.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return horas;
}

// --------- COMPONENTE PRINCIPAL ---------
export default function Reserva() {
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const horariosDisponibles = getHorariosParaFecha(fecha);

  function handleFechaChange(e) {
    const val = e.target.value;
    const d = new Date(val + "T00:00");
    if (val < getTodayISO()) {
      setError("No se puede reservar días anteriores.");
      setFecha("");
      setHora("");
      return;
    }
    if (d.getDay() === 0) {
      setError("No se puede reservar domingos.");
      setFecha("");
      setHora("");
      return;
    }
    setFecha(val);
    setHora("");
    setError("");
  }

  function handleHoraChange(e) {
    setHora(e.target.value);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!fecha) return setError("Seleccione una fecha válida.");
    const d = new Date(fecha + "T00:00");
    if (fecha < getTodayISO()) return setError("No se puede reservar días anteriores.");
    if (d.getDay() === 0) return setError("No se puede reservar domingos.");
    if (!hora) return setError("Seleccione un horario válido.");

    const h = parseInt(hora.split(":")[0]);
    if (
      (d.getDay() >= 1 && d.getDay() <= 5 && (h < 9 || h >= 21)) ||
      (d.getDay() === 6 && (h < 9 || h >= 13))
    ) return setError("Hora fuera del rango permitido.");

    const form = e.target;
    const datos = {
      nombre: form.nombre.value,
      telefono: form.telefono.value,
      fecha,
      hora,
      motivo: form.motivo.value
    };

    try {
      const respuesta = await fetch("/api/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const data = await respuesta.json();

      if (!respuesta.ok || data.result !== "success") {
        throw new Error(data.error || "Error al guardar la reserva.");
      }

      setEnviado(true);
      form.reset();
      setFecha("");
      setHora("");
      setTimeout(() => setEnviado(false), 3000);
    } catch (err) {
      setError(err.message || "No se pudo reservar, intente otra vez.");
    }
  }

  return (
    <>
      {/* EL FONDO AHORA ES UN POCO MÁS CONTRASTANTE (#e8f4f5) 
        PARA QUE LA OLA BLANCA SE NOTE PERFECTAMENTE.
      */}
      <section id="reserva" className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 w-full bg-gradient-to-b from-[#e8f4f5] via-[#f0f9fa] to-white overflow-hidden">
        
        {/* --- OLAS DOBLES MÁS NOTORIAS --- */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[80px] md:h-[150px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            {/* Ola de fondo (semi-transparente) para dar más volumen */}
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FAFCFF" opacity="0.5"></path>
            {/* Ola principal */}
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V15A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FAFCFF"></path>
          </svg>
        </div>

        {/* Brillos suaves */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/60 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* COLUMNA IZQUIERDA: Textos y WhatsApp */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* NUEVA ESTÉTICA EDITORIAL: Tu próximo paso */}
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
                <div className="h-[2px] w-12 bg-[#0B1220]"></div>
                <span className="font-sans text-xs md:text-sm font-black uppercase tracking-[0.3em] text-[#0B1220]">
                  Tu próximo paso
                </span>
              </div>
              
              {/* TÍTULO SÓLIDO (Cero arcoíris, efecto de resaltador por detrás) */}
              <h2 className="text-5xl lg:text-[4.5rem] font-sans font-black text-[#0B1220] tracking-tighter leading-[1.05] mb-8">
                Diseñemos tu <br />
                <span className="relative inline-block text-[#3CD2D4] z-10">
                  nueva sonrisa.
                  {/* Bloque de color simulando un resaltador detrás del texto */}
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-[#3CD2D4]/20 -z-10 rounded-sm"></span>
                </span>
              </h2>
              
              <p className="text-slate-500 font-inter text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed mb-12">
                Elegí el día y horario en nuestra agenda online, o contactanos por WhatsApp para una atención inmediata y personalizada.
              </p>

              {/* Botón de WhatsApp Premium */}
              <a
                href="https://wa.me/543815555550?text=Hola,%20quiero%20un%20turno!"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-5 px-8 py-4 bg-white hover:bg-[#0B1220] rounded-[2rem] shadow-[0_15px_40px_rgba(11,18,32,0.06)] hover:shadow-2xl transition-all duration-500 w-fit ring-1 ring-slate-100"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366]/20 transition-colors">
                  <WhatsappLogo size={28} weight="fill" className="text-[#25D366]" />
                </div>
                <div className="flex flex-col items-start pr-4">
                  <span className="font-sans font-bold text-base tracking-wide text-[#0B1220] group-hover:text-white transition-colors leading-none mb-1.5">
                    WhatsApp Directo
                  </span>
                  <span className="font-inter text-[10px] text-slate-400 group-hover:text-white/60 tracking-widest uppercase font-semibold">
                    Atención inmediata
                  </span>
                </div>
              </a>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[50%] max-w-xl"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(11,18,32,0.06)] border border-slate-100 p-8 md:p-12 flex flex-col gap-6 relative"
            >
              <div className="flex flex-col mb-4">
                <h3 className="text-3xl font-sans font-black text-[#0B1220] tracking-tight mb-2">Reserva online</h3>
                <p className="font-inter text-sm text-slate-500">Completá tus datos y confirmá tu cita.</p>
              </div>

              {/* Campos del Formulario */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ReservaInput label="Nombre completo" name="nombre" required icon={<User size={20} weight="duotone" />} />
                <ReservaInput label="Teléfono" name="telefono" type="tel" required icon={<Phone size={20} weight="duotone" />} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative z-0 w-full group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3CD2D4]"><CalendarBlank size={20} weight="duotone" /></span>
                  <input
                    type="date"
                    name="fecha"
                    required
                    min={getTodayISO()}
                    value={fecha}
                    onChange={handleFechaChange}
                    className="block w-full pl-12 pr-4 py-4 text-sm text-[#0B1220] bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#3CD2D4] focus:ring-2 focus:ring-[#3CD2D4]/20 transition-all"
                  />
                  <span className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 rounded-full border border-slate-100">Fecha</span>
                </div>

                <div className="relative z-0 w-full group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3CD2D4]"><Clock size={20} weight="duotone" /></span>
                  <select
                    name="hora"
                    required
                    value={hora}
                    onChange={handleHoraChange}
                    disabled={!fecha || horariosDisponibles.length === 0}
                    className="block w-full pl-12 pr-4 py-4 text-sm text-[#0B1220] bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#3CD2D4] focus:ring-2 focus:ring-[#3CD2D4]/20 transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>Seleccionar</option>
                    {horariosDisponibles.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  <span className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 rounded-full border border-slate-100">Hora</span>
                </div>
              </div>

              <div className="relative z-0 w-full group mt-2">
                <textarea
                  name="motivo"
                  required
                  rows={3}
                  className="block w-full p-5 text-sm text-[#0B1220] bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#3CD2D4] focus:ring-2 focus:ring-[#3CD2D4]/20 transition-all resize-none placeholder-slate-400"
                  placeholder="¿Cuál es el motivo de tu consulta?"
                />
              </div>

              {error && (
                <div className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl text-center border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="group relative w-full flex items-center justify-center gap-2 mt-4 px-8 py-4 bg-[#3CD2D4] hover:bg-cyan-300 text-[#0B1220] rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_10px_20px_rgba(60,210,212,0.2)] hover:shadow-[0_15px_30px_rgba(60,210,212,0.4)] overflow-hidden"
              >
                {enviado ? (
                  <AnimatePresence>
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-[#0B1220]"
                    >
                      <CheckCircle size={20} weight="fill" /> ¡Turno Solicitado!
                    </motion.span>
                  </AnimatePresence>
                ) : (
                  <>
                    <span>Confirmar Reserva</span>
                    <PaperPlaneRight size={18} weight="fill" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* --- SECCIÓN MAPA --- */}
      <section className="w-full bg-white pb-24 md:pb-32 px-6" id="ubicacion">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FAFCFF] border border-slate-100 shadow-sm mb-6 text-[#3CD2D4]">
              <MapPin size={32} weight="duotone" />
            </div>
            <h3 className="text-3xl md:text-5xl font-sans font-black text-[#0B1220] tracking-tight mb-4">
              ¿Dónde nos encontrás?
            </h3>
            <p className="text-slate-500 font-inter text-base md:text-lg max-w-2xl mx-auto">
              Estamos ubicados en <strong className="text-[#0B1220] font-bold">Perú 1200, Yerba Buena – Tucumán</strong>. Una zona céntrica, segura y de fácil acceso para tu comodidad.
            </p>
          </div>

          <div className="w-full rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(11,18,32,0.06)] border border-slate-100 bg-slate-50 relative aspect-[4/3] md:aspect-[21/9] p-2 md:p-3">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
              <iframe
                title="Ubicación de Cariló Consultorio"
                src="https://maps.google.com/maps?q=Perú%201200,%20Yerba%20Buena,%20Tucumán&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                allowFullScreen
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// --------- AUXILIARES VISUALES ---------
function ReservaInput({ label, icon, ...props }) {
  return (
    <div className="relative z-0 w-full group">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3CD2D4]/70">{icon}</span>
      <input
        {...props}
        placeholder={label} 
        className="block w-full pl-12 pr-4 py-4 text-sm text-[#0B1220] placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#3CD2D4] focus:ring-2 focus:ring-[#3CD2D4]/20 transition-all"
        autoComplete="off"
      />
    </div>
  );
}