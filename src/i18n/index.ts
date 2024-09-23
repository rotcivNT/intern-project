import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import vi from "./locales/vi.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: I18nNamespaces;
  }
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "vi",
    fallbackLng: "vi",
    ns: ["auth"],
    returnObjects: true,
    resources: {
      en,
      vi,
    },
    interpolation: {
      escapeValue: false,
    },
  });
