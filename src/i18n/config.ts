import { CH_TEXTS } from "@/assets/locales/ch";
import { EN_TEXTS } from "@/assets/locales/en";
import { RU_TEXTS } from "@/assets/locales/ru";
import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: EN_TEXTS,
  ru: RU_TEXTS,
  zh: CH_TEXTS,
};

i18n
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Order of detection methods
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],

      lookupLocalStorage: "preferred-language",
    },
  });

export default i18n;
