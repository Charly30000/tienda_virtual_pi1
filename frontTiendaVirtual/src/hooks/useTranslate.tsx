import es from "@/i18n/es-ES.json";

/**
 * Hook destinado para realizar el manejo de mensajes de texto 
 * con idea futura de que se pueda cambiar el idioma
 */
export const useTranslate = () => {
  const translations: Record<string, any> = es;

  const t = (namespace: string, key: string): string => {
    const translation = translations[namespace]?.[key];
    return translation || "[[UNDEFINED]]";
  };

  return t;
};
