import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // 👇 Esta línea asegura compatibilidad total con Vercel y Render
  output: "standalone",
};

export default nextConfig;
