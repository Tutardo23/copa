import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// 1. Tipografías de Alta Gama
const inter = Inter({ 
  variable: "--font-inter", 
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({ 
  variable: "--font-playfair", 
  subsets: ["latin"],
  display: 'swap',
});

// 2. SEO Optimizado y Extendido (Copywriting Premium)
export const metadata: Metadata = {
  title: "Odontólogo en Yerba Buena Tucumán | Cariló Consultorio Odontológico",
  description: "Consultorio odontológico en Yerba Buena, Tucumán. Especialistas en estética dental, ortodoncia invisible y rehabilitación oral. Dr. Juan Luis Micoli y Dra. María Luz Graña. Reservá tu turno online.",
  keywords: ["odontología", "dentista", "Yerba Buena", "Tucumán", "estética dental", "diseño de sonrisa", "ortodoncia", "Carilo Consultorio"],
  metadataBase: new URL("https://cariloconsultorio.com"), // Cambiar por el dominio final
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Odontólogo en Yerba Buena | Cariló Consultorio",
    description: "Reservá tu turno odontológico en Yerba Buena, Tucumán. Estética dental, ortodoncia y rehabilitación oral con tecnología de punta.",
    url: "https://cariloconsultorio.com/",
    siteName: "Carilo Consultorio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // ¡Acordate de crear esta imagen de 1200x630!
        width: 1200,
        height: 630,
        alt: "Instalaciones de Carilo Consultorio Odontológico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Odontólogo en Yerba Buena | Cariló Consultorio",
    description: "Estética dental, ortodoncia y rehabilitación oral en Yerba Buena, Tucumán.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FAFCFF] text-[#0B1220]`}>
        
        {/* 3. Schema.org Corregido y Sincronizado con la lógica de Reserva */}
        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["MedicalClinic", "Dentist"],
            "name": "Carilo Consultorio Odontológico",
            "image": "https://cariloconsultorio.com/og-image.jpg",
            "@id": "https://cariloconsultorio.com/",
            "url": "https://cariloconsultorio.com/",
            "telephone": "+54-381-5555550", // Sincronizado con el link de WhatsApp
            "priceRange": "$$",
            "medicalSpecialty": "Dentistry",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Perú 1200", // Corregido para coincidir con el mapa
              "addressLocality": "Yerba Buena",
              "addressRegion": "Tucumán",
              "postalCode": "T4107",
              "addressCountry": "AR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -26.8167, 
              "longitude": -65.3167
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "21:00" // Corregido según tu lógica JS
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "13:00" // Corregido según tu lógica JS
              }
            ],
            "sameAs": [
              "https://www.facebook.com/CariloConsultorio",
              "https://www.instagram.com/cariloconsultorio"
            ]
          })}
        </Script>
        
        {children}
      </body>
    </html>
  );
}