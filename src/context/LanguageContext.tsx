import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, TRANSLATIONS, TranslationDictionary } from '../data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nahalabs_lang');
      if (stored === 'st' || stored === 'en') return stored;
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('nahalabs_lang', lang);
      document.documentElement.lang = lang;
    } catch {
      // LocalStorage access failsafe
    }
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'st' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

const defaultLanguageContext: LanguageContextType = {
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: TRANSLATIONS.en,
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    return defaultLanguageContext;
  }
  return context;
};
