// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { login } from "../utils/network-data";
import PropTypes from "prop-types";
import { useLanguage } from "../contexts/LanguageContext";
import "../style/LoginPage.css";

const LoginPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { language, changeLanguage } = useLanguage();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    if (!response.error) {
      localStorage.setItem("accessToken", response.data.accessToken);
      setCurrentPage("homepage");
    } else {
      setError("Login failed");
    }
  };

  const handleChangeLanguage = (lang) => {
    changeLanguage(lang);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>{language === "en" ? "Login" : "Masuk"}</h1>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">
            {language === "en" ? "Login" : "Masuk"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      <div className="language-buttons">
        <button onClick={() => handleChangeLanguage("en")}>English</button>
        <button onClick={() => handleChangeLanguage("id")}>Indonesian</button>
      </div>
      <p>
        {language === "en" ? "Don't have an account? " : "Belum punya akun? "}
        <a
          href="#"
          onClick={() => setCurrentPage("register")}
          className="register-link"
        >
          {language === "en" ? "Register here" : "Daftar disini"}
        </a>
      </p>
    </div>
  );
};

LoginPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default LoginPage;
