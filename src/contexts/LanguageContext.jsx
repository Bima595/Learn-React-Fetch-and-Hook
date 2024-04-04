// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

// Buat context baru untuk bahasa
const LanguageContext = createContext();

// Buat provider untuk menyediakan fungsi dan state bahasa
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default bahasa Inggris

  // Fungsi untuk mengubah bahasa
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Memastikan value yang disediakan adalah objek
  const value = {
    language,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook untuk mengakses context bahasa
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

LanguageProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  