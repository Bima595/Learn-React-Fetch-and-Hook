// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { register } from "../utils/network-data";
import PropTypes from "prop-types";
import { useLanguage } from "../contexts/LanguageContext";
import "../style/RegisterPage.css";

const RegisterPage = ({ setCurrentPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { language, changeLanguage } = useLanguage();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await register({ name, email, password });
    if (!response.error) {
      setCurrentPage("login");
    } else {
      setError("Registration failed");
    }
  };

  const handleChangeLanguage = (lang) => {
    changeLanguage(lang);
  };

  return (
    <div className="register-container">
      <div className="language-buttons">
        <button
          onClick={() => handleChangeLanguage("en")}
          className="language-button"
        >
          English
        </button>
        <button
          onClick={() => handleChangeLanguage("id")}
          className="language-button"
        >
          Indonesian
        </button>
      </div>
      <div className="register-form">
        <h1>{language === "en" ? "Register" : "Daftar"}</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder={language === "en" ? "Name" : "Nama"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
          <input
            type="email"
            placeholder={language === "en" ? "Email" : "Surel"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder={language === "en" ? "Password" : "Kata Sandi"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="register-button">
            {language === "en" ? "Register" : "Daftar"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>
          {language === "en"
            ? "Already have an account? "
            : "Sudah punya akun? "}
          <a
            href="#"
            onClick={() => setCurrentPage("login")}
            className="login-link"
          >
            {language === "en" ? "Login here" : "Login disini"}
          </a>
        </p>
      </div>
    </div>
  );
};

RegisterPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default RegisterPage;
