// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { register } from "../utils/network-data";
import PropTypes from 'prop-types';

const RegisterPage = ({ setCurrentPage }) => {
  // State untuk menyimpan data registrasi
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fungsi untuk melakukan registrasi
  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await register({ name, email, password });
    if (!response.error) {
      // Registrasi berhasil, kembali ke halaman login
      setCurrentPage("login");
      
    } else {
      // Registrasi gagal, tampilkan pesan error
      setError("Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Register</button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Sudah punya akun?{" "}
        <a href="#" onClick={() => setCurrentPage("login")}>
          Login disini
        </a>
      </p>
    </div>
  );
};

RegisterPage.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
  };

export default RegisterPage;
