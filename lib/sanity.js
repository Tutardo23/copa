import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'e9v40d64', // Tu ID de proyecto (ya lo tenés)
  dataset: 'production',
  useCdn: true, // para que sea rápido (solo lectura)
  apiVersion: '2025-07-29', // fecha de hoy
  token: process.env.SANITY_API_TOKEN,
})
