import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Odontología en Yerba Buena | Cariló Consultorio",
  description:
    "Consultorio odontológico en Yerba Buena, Tucumán. Turnos online, atención profesional y tratamientos personalizados.",
  openGraph: {
    title: "Cariló Consultorio | Odontología en Yerba Buena",
    description:
      "Reservá tu turno odontológico en Yerba Buena. Atención profesional con tecnología de punta.",
    url: "https://cariloconsultorio.com/",
    images: [
      {
        url: "https://cariloconsultorio.com/og-image.jpg",
      },
    ],
    siteName: "Cariló Consultorio",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cariló Consultorio | Odontología en Yerba Buena",
    description:
      "Turnos odontológicos en Yerba Buena. Atención estética, preventiva y funcional.",
    images: ["https://cariloconsultorio.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              "name": "Carilo Consultorio Odontológico",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Yerba Buena",
                "addressRegion": "Tucumán",
                "addressCountry": "Argentina"
              },
              "url": "https://cariloconsultorio.com/",
              "logo": "https://cariloconsultorio.com/logo.png",
              "sameAs": [
                "https://www.facebook.com/CariloConsultorio",
                "https://www.instagram.com/CariloConsultorio"
              ]
            }
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
