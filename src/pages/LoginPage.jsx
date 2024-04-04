// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { login } from "../utils/network-data";
import PropTypes from "prop-types";

const LoginPage = ({ setCurrentPage }) => {
  // State untuk menyimpan data login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fungsi untuk melakukan login
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });
    if (!response.error) {
      // Login berhasil, arahkan ke halaman homepage
      setCurrentPage('homepage');
    } else {
      setError('Login failed');
    }
  };
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Belum punya akun?{" "}
        <a href="#" onClick={() => setCurrentPage("register")}>
          Daftar disini
        </a>
      </p>
    </div>
  );
};

LoginPage.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default LoginPage;
