// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { login } from "../utils/network-data";
import PropTypes from "prop-types";
import "../style/LoginPage.css";

const LoginPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    if (!response.error) {
      localStorage.setItem('accessToken', response.data.accessToken);
      setCurrentPage('homepage');
    } else {
      setError('Login failed');
    }
  };
  
  
  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="login-button">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p>
          Belum punya akun?{" "}
          <a href="#" onClick={() => setCurrentPage("register")} className="register-link">
            Daftar disini
          </a>
        </p>
      </div>
    </div>
  );
} 

LoginPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default LoginPage;
