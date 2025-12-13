"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --------- FONDO ANIMADO ---------
function FondoBomba() {
  return (
    <>
      <div className="absolute inset-0 -z-20">
        <svg width="100%" height="100%" className="w-full h-full absolute top-0 left-0">
          <defs>
            <linearGradient id="split-blue" x1="0" x2="1" y1="0" y2="1">
              <stop offset="45%" stopColor="#fff" />
              <stop offset="100%" stopColor="#3CD2D4" stopOpacity="0.18"/>
            </linearGradient>
          </defs>
          <polygon points="0,0 1440,0 1440,900 0,720" fill="url(#split-blue)" />
        </svg>
        <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <circle
              key={i}
              cx={200 + Math.random() * 1100}
              cy={40 + Math.random() * 500}
              r={14 + Math.random() * 18}
              fill="#3CD2D4"
              fillOpacity={0.10 + Math.random() * 0.10}
            />
          ))}
        </svg>
        <svg className="absolute left-0 bottom-0 w-full h-24" viewBox="0 0 1440 90">
          <path
            fill="#3CD2D4"
            fillOpacity="0.13"
            d="M0,65 Q480,10,1440,60 L1440,90 L0,90 Z"
          />
        </svg>
      </div>
    </>
  );
}

// --------- LÓGICA FECHAS Y HORARIOS ---------
function getTodayISO() {
  const today = new Date();
  today.setHours(0,0,0,0);
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
      // (sin token en el cliente)
    };

    console.log("📦 Enviando datos:", datos);

    try {
      // ⤵️ Ahora enviamos a la API interna segura
      const respuesta = await fetch("/api/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const data = await respuesta.json();
      console.log("✅ Respuesta del servidor:", data);

      if (!respuesta.ok || data.result !== "success") {
        throw new Error(data.error || "Error al guardar la reserva.");
      }

      // Animación de éxito
      setEnviado(true);
      form.reset();
      setFecha("");
      setHora("");
      setTimeout(() => setEnviado(false), 2600);
    } catch (err) {
      console.error("❌ Error al reservar:", err);
      setError(err.message || "No se pudo reservar, intente otra vez.");
    }
  }

  return (
     <>
    <section
      id="reserva"
      className="relative py-24 px-6 md:px-0 flex items-center justify-center bg-white overflow-hidden"
      style={{ minHeight: 630 }}
    >
      <FondoBomba />
      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
        {/* Columna Izq */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-playfair bg-gradient-to-r from-[#3CD2D4] to-[#23a8aa] text-transparent bg-clip-text drop-shadow mb-2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            ¡Reservá tu turno o consultanos ahora!
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl font-medium text-[#23a8aa] max-w-lg"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          >
            Elegí día y horario, o escribinos por WhatsApp para una atención aún más rápida.
          </motion.p>
          <motion.a
            href="https://wa.me/543815555550?text=Hola,%20quiero%20un%20turno!"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 px-7 py-4 bg-[#3CD2D4] text-white font-bold rounded-full shadow-2xl hover:bg-[#23a8aa] transition text-lg ring-2 ring-[#3CD2D4]/20 focus:ring-4 relative"
            whileHover={{ scale: 1.08 }}
          >
            <WhatsAppIcon />
            WhatsApp Directo
            <span className="ml-3 bg-white/80 text-[#3CD2D4] px-3 py-1 rounded-full text-xs font-bold animate-pulse">¡Respuesta inmediata!</span>
          </motion.a>
          <div className="hidden md:block mt-6"><IlustracionSVG /></div>
        </div>
        {/* Formulario */}
        <motion.form
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, type: "spring", delay: 0.15 }}
          className="flex-1 bg-white/60 backdrop-blur-[7px] rounded-3xl shadow-2xl border border-[#3CD2D4]/20 p-10 md:ml-0 w-full max-w-md mx-auto flex flex-col gap-7 relative z-10"
          onSubmit={handleSubmit}
        >
          <div className="text-2xl font-bold mb-2 text-[#3CD2D4] flex items-center gap-3">
            <CalendarIcon /> Reserva online
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReservaInput label="Nombre" name="nombre" required icon={<UserIcon />} />
            <ReservaInput label="Teléfono" name="telefono" required icon={<PhoneIcon />} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FECHA */}
            <div className="relative z-0 w-full group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3CD2D4]"><DateIcon /></span>
              <input
                type="date"
                name="fecha"
                required
                min={getTodayISO()}
                value={fecha}
                onChange={handleFechaChange}
                className="block py-4 pl-11 pr-4 w-full text-gray-900 bg-white/85 border-b-2 border-[#3CD2D4]/40 appearance-none focus:outline-none focus:ring-0 focus:border-[#3CD2D4] peer rounded-xl shadow focus:shadow-xl transition placeholder:italic"
                placeholder=" "
                autoComplete="off"
              />
              <label
                className="absolute left-11 top-4 text-gray-500 duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 pointer-events-none"
              >
                Fecha
              </label>
            </div>
            {/* HORA */}
            <div className="relative z-0 w-full group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3CD2D4]"><ClockIcon /></span>
              <select
                name="hora"
                required
                value={hora}
                onChange={handleHoraChange}
                disabled={!fecha || horariosDisponibles.length === 0}
                className="block py-4 pl-11 pr-4 w-full text-gray-900 bg-white/85 border-b-2 border-[#3CD2D4]/40 appearance-none focus:outline-none focus:ring-0 focus:border-[#3CD2D4] peer rounded-xl shadow focus:shadow-xl transition placeholder:italic"
                placeholder=" "
                autoComplete="off"
              >
                <option value="" disabled>
                  Selecciona hora
                </option>
                {horariosDisponibles.map(h =>
                  <option key={h} value={h}>{h}</option>
                )}
              </select>
              <label
                className="absolute left-11 top-4 text-gray-500 duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 pointer-events-none"
              >
                Hora
              </label>
            </div>
          </div>
          <ReservaTextarea label="Motivo / Consulta" name="motivo" required />
          {error && (
            <div className="text-red-500 font-semibold">{error}</div>
          )}
          <motion.button
            type="submit"
            whileTap={{ scale: 1.09 }}
            className="mt-3 px-8 py-4 bg-[#3CD2D4] hover:bg-[#23a8aa] rounded-full font-bold uppercase shadow-lg text-white tracking-wider focus:outline-none focus:ring-4 ring-[#3CD2D4]/30 text-lg transition relative overflow-hidden"
          >
            {enviado ? (
              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.12 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <CheckIcon /> ¡Enviado!
                </motion.span>
              </AnimatePresence>
            ) : (
              <>Reservar turno</>
            )}
          </motion.button>
          {enviado && <Fireworks />}
        </motion.form>
      </div>

      <div className="md:hidden absolute right-2 bottom-2 w-36 opacity-80 pointer-events-none z-0">
        <IlustracionSVG />
      </div>

    </section>

  <section className="w-full bg-white py-20 px-6 md:px-0" id="ubicacion">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-[#3CD2D4] mb-3">
          ¿Dónde estamos?
        </h3>
        <p className="text-neutral-600 mb-8 text-base md:text-lg">
          Nos encontrás en <strong>Perú 1200, Yerba Buena – Tucumán</strong>. Zona céntrica, segura y de fácil acceso.
        </p>
        <div className="rounded-2xl overflow-hidden border border-[#3CD2D4]/30 shadow-xl w-full aspect-[16/9]">
          <iframe
            title="Ubicación de Cariló Consultorio"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.0758416901813!2d-65.29599522376836!3d-26.82468577672279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225de9f8992f35%3A0xcea31f5c637c1b15!2sPer%C3%BA%201200%2C%20T4107%20Yerba%20Buena%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1691346872715!5m2!1ses!2sar"
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  </>
);
}

// --------- AUXILIARES VISUALES E ÍCONOS ---------
function ReservaInput({ label, icon, ...props }) {
  return (
    <div className="relative z-0 w-full group">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3CD2D4]">{icon}</span>
      <input
        {...props}
        className="block py-4 pl-11 pr-4 w-full text-gray-900 bg-white/85 border-b-2 border-[#3CD2D4]/40 appearance-none focus:outline-none focus:ring-0 focus:border-[#3CD2D4] peer rounded-xl shadow focus:shadow-xl transition placeholder:italic"
        placeholder=" "
        autoComplete="off"
      />
      <label
        className="absolute left-11 top-4 text-gray-500 duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}
function ReservaTextarea({ label, ...props }) {
  return (
    <div className="relative z-0 w-full group">
      <textarea
        {...props}
        className="block py-4 px-5 w-full min-h-[86px] text-gray-900 bg-white/85 border-b-2 border-[#3CD2D4]/40 appearance-none focus:outline-none focus:ring-0 focus:border-[#3CD2D4] peer rounded-xl shadow focus:shadow-xl transition resize-none"
        placeholder=" "
      />
      <label
        className="absolute left-5 top-4 text-gray-500 duration-200 transform -translate-y-4 scale-75 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}
function IlustracionSVG() {
  return (
    <svg width="120" height="120" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" fill="#3CD2D4" fillOpacity="0.12" />
      <ellipse cx="24" cy="27" rx="12" ry="8" fill="#3CD2D4" fillOpacity="0.2" />
      <rect x="13" y="15" width="22" height="18" rx="6" fill="#fff" stroke="#3CD2D4" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="3" fill="#3CD2D4" />
      <rect x="21" y="28" width="6" height="2" rx="1" fill="#3CD2D4" fillOpacity="0.8" />
    </svg>
  );
}
function WhatsAppIcon() { return <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M21.05 3.05a10 10 0 00-14.14 0 9.93 9.93 0 00-2.93 7.07 9.75 9.75 0 001.36 5.11l-1.38 5.08 5.19-1.35a9.84 9.84 0 004.87 1.25c2.67 0 5.18-1.04 7.07-2.93a10 10 0 000-14.14zm-9.13 16.05a8.11 8.11 0 01-4.12-1.12l-.29-.17-3.08.8.82-3.01-.19-.3A8.09 8.09 0 113 11.91a8.06 8.06 0 018.92 7.19z"/><path d="M17.71 14.29c-.29-.14-1.69-.84-1.95-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.91 1.12-.17.19-.34.22-.63.08a7.56 7.56 0 01-2.21-1.37 8.28 8.28 0 01-1.53-1.9c-.16-.27-.02-.41.12-.55.12-.13.27-.35.41-.52.14-.17.19-.29.29-.49.1-.19.05-.36-.02-.5-.07-.13-.64-1.55-.88-2.14-.23-.56-.46-.48-.64-.49h-.54c-.18 0-.46.07-.7.35-.23.29-.9.89-.9 2.18 0 1.29.9 2.54 1.02 2.72.12.17 1.78 2.72 4.32 3.69.6.21 1.07.33 1.44.42.61.16 1.16.14 1.6.09.49-.05 1.5-.61 1.72-1.2.21-.59.21-1.09.15-1.2-.06-.11-.27-.18-.57-.32z"/></svg>; }
function UserIcon() { return <svg className="w-5 h-5" fill="none" stroke="#3CD2D4" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2"/></svg>; }
function PhoneIcon() { return <svg className="w-5 h-5" fill="none" stroke="#3CD2D4" strokeWidth={2} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.72 19.72 0 013 5.18 2 2 0 015 3h3a2 2 0 012 1.72c.13 1.01.37 2.01.72 2.97a2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.96.35 1.96.59 2.97.72A2 2 0 0121 16.92z"/></svg>; }
function DateIcon() { return <svg className="w-5 h-5" fill="none" stroke="#3CD2D4" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>; }
function ClockIcon() { return <svg className="w-5 h-5" fill="none" stroke="#3CD2D4" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>; }
function CalendarIcon() { return <svg className="w-7 h-7 mr-1" fill="none" stroke="#3CD2D4" strokeWidth={2.5} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>; }
function CheckIcon() { return <svg className="w-7 h-7 text-[#3CD2D4]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>; }
function Fireworks() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: [1, 1.12, 1] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1 }}
      style={{ zIndex: 99 }}
    >
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute block w-5 h-5 rounded-full"
          style={{
            background: "#3CD2D4",
            left: "50%", top: "50%",
            transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
            opacity: 0.7
          }}
          animate={{
            x: [0, 70, 0],
            y: [0, -30, 0],
            scale: [1, 1.6, 0.7],
            opacity: [0.7, 0, 0]
          }}
          transition={{ duration: 1, delay: i * 0.08 }}
        />
      ))}
    </motion.div>
  );
}
