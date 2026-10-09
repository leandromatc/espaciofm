// Datos de contacto públicos. Completá lo que tengas: lo que quede en `null`
// no se muestra en el sitio (no hay marcadores vacíos).
export const CONTACT = {
  address: "18 de Julio y Aldunate, Mercedes, Soriano",
  /** Ej: "+598 4532 0000" */
  phone: null as string | null,
  /** Ej: "info@espaciosport.com.uy" */
  email: null as string | null,
  /** Solo dígitos con código de país, ej: "59899123456" */
  whatsapp: null as string | null,
} as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;

export const CV10_URL = "https://cv10.plag.tv";
