import React, { createContext, useContext, useEffect, useState } from "react";

const translations = {
  en: {
    logout: "Logout",
    home: "Home",
    program: "Program",
    transformation: "Transformation",
    "about-us": "About Us",
    subscribe: "Subscribe",
  },
  ar: {
    logout: "تسجيل الخروج",
    home: "الرئيسية",
    program: "البرنامج",
    transformation: "التحويلات",
    "about-us": "من نحن",
    subscribe: "اشترك",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("lang") || "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
  }, [lang]);

  const toggle = () => setLang((l) => (l === "en" ? "ar" : "en"));

  const t = (key) => {
    return translations[lang] && translations[lang][key]
      ? translations[lang][key]
      : key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
