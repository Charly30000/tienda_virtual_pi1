import React from "react";
import es from "@/i18n/es-ES.json";

export const useTranslate = () => {
  const translations: Record<string, any> = es;

  const t = (namespace: string, key: string): string => {
    const translation = translations[namespace]?.[key];
    return translation || "[[UNDEFINED]]";
  };

  return t;
};
