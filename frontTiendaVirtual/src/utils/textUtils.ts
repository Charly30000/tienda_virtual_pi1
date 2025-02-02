/**
 * Sanitiza un texto eliminando etiquetas HTML y espacios innecesarios.
 * También previene ataques XSS codificando caracteres especiales.
 * @param {string} input - El texto a sanitizar.
 * @returns {string} - Texto limpio y seguro.
 */
export const sanitizeText = (input: string) => {
  if (typeof input !== "string") return "";
  const cleanText = input.replace(/<\/?[^>]+(>|$)/g, "");
  const escapedText = cleanText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  return escapedText.trim();
};
